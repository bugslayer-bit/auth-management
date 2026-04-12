import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { RoleEntity } from '../../roles/role.entity.ts';
import { AdminUserEntity } from '../admin-user.entity.ts';
import { CreateAdminUserCommand } from './create-admin-user.command.ts';

@CommandHandler(CreateAdminUserCommand)
export class CreateAdminUserHandler
  implements ICommandHandler<CreateAdminUserCommand, AdminUserEntity>
{
  constructor(
    @InjectRepository(AdminUserEntity)
    private adminUserRepository: Repository<AdminUserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(command: CreateAdminUserCommand): Promise<AdminUserEntity> {
    const { createAdminUserDto } = command;
    const { roleIds, ...rest } = createAdminUserDto;

    const entity = this.adminUserRepository.create(rest);

    if (roleIds?.length) {
      entity.roles = await this.roleRepository.findBy({ id: In(roleIds) });
    }

    await this.adminUserRepository.save(entity);

    return entity;
  }
}
