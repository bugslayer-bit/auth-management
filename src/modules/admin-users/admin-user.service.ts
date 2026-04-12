import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type FindOptionsWhere } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { PageDto } from '../../common/dto/page.dto.ts';
import { UserRoleService } from '../user-roles/user-role.service.ts';
import { AdminUserEntity } from './admin-user.entity.ts';
import { CreateAdminUserCommand } from './commands/create-admin-user.command.ts';
import { AdminUserDto } from './dto/admin-user.dto.ts';
import { AdminUserPageOptionsDto } from './dto/admin-user-page-options.dto.ts';
import { CreateAdminUserDto } from './dto/create-admin-user.dto.ts';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto.ts';
import { AdminUserNotFoundException } from './exceptions/admin-user-not-found.exception.ts';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private adminUserRepository: Repository<AdminUserEntity>,
    private userRoleService: UserRoleService,
    private commandBus: CommandBus,
  ) {}

  findOne(
    findData: FindOptionsWhere<AdminUserEntity>,
  ): Promise<AdminUserEntity | null> {
    return this.adminUserRepository.findOneBy(findData);
  }

  @Transactional()
  async createAdminUser(
    createAdminUserDto: CreateAdminUserDto,
  ): Promise<AdminUserEntity> {
    const entity = await this.commandBus.execute<
      CreateAdminUserCommand,
      AdminUserEntity
    >(new CreateAdminUserCommand(createAdminUserDto));

    if (createAdminUserDto.roleIds?.length) {
      await this.userRoleService.replaceUserRoles(
        entity.id,
        createAdminUserDto.roleIds,
      );
    }

    return this.getAdminUser(entity.id);
  }

  async getAdminUsers(
    pageOptionsDto: AdminUserPageOptionsDto,
  ): Promise<PageDto<AdminUserDto>> {
    const queryBuilder = this.adminUserRepository
      .createQueryBuilder('adminUser')
      .leftJoinAndSelect('adminUser.roles', 'roles');

    queryBuilder.searchByString(pageOptionsDto?.q ?? '', [
        'adminUser.name',
        'adminUser.username',
        'adminUser.email',
        'adminUser.contactNo',
      ])
      .orderBy('adminUser.createdAt', pageOptionsDto.order);
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getAdminUser(id: Uuid): Promise<AdminUserEntity> {
    const entity = await this.adminUserRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!entity) {
      throw new AdminUserNotFoundException();
    }

    return entity;
  }

  @Transactional()
  async updateAdminUser(
    id: Uuid,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<void> {
    const entity = await this.getAdminUser(id);
    const { roleIds, ...rest } = updateAdminUserDto;

    this.adminUserRepository.merge(entity, rest);

    await this.adminUserRepository.save(entity);

    if (roleIds) {
      await this.userRoleService.replaceUserRoles(id, roleIds);
    }
  }

  async deleteAdminUser(id: Uuid): Promise<void> {
    const entity = await this.getAdminUser(id);

    await this.adminUserRepository.remove(entity);
  }
}
