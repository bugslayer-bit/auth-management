import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminUserEntity } from '../admin-user.entity.ts';
import { CreateAdminUserCommand } from './create-admin-user.command.ts';

@CommandHandler(CreateAdminUserCommand)
export class CreateAdminUserHandler
  implements ICommandHandler<CreateAdminUserCommand, AdminUserEntity>
{
  constructor(
    @InjectRepository(AdminUserEntity)
    private adminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async execute(command: CreateAdminUserCommand): Promise<AdminUserEntity> {
    const { createAdminUserDto } = command;
    const { roleIds: _roleIds, ...rest } = createAdminUserDto;

    const entity = this.adminUserRepository.create(rest);

    await this.adminUserRepository.save(entity);

    return entity;
  }
}
