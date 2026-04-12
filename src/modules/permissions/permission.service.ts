import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '../../common/dto/page.dto.ts';
import { CreatePermissionDto } from './dto/create-permission.dto.ts';
import { PermissionDto } from './dto/permission.dto.ts';
import { PermissionsPageOptionsDto } from './dto/permissions-page-options.dto.ts';
import { UpdatePermissionDto } from './dto/update-permission.dto.ts';
import { PermissionNotFoundException } from './exceptions/permission-not-found.exception.ts';
import { PermissionEntity } from './permission.entity.ts';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    const permission = this.permissionRepository.create(createPermissionDto);

    await this.permissionRepository.save(permission);

    return permission;
  }

  async getPermissions(
    pageOptionsDto: PermissionsPageOptionsDto,
  ): Promise<PageDto<PermissionDto>> {
    const queryBuilder =
      this.permissionRepository.createQueryBuilder('permission');
    queryBuilder.searchByString(pageOptionsDto?.q ?? '', [
        'permission.name',
        'permission.subject',
         'permission.action',
      ])
      .orderBy('permission.createdAt', pageOptionsDto.order);
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getPermission(id: Uuid): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!permission) {
      throw new PermissionNotFoundException();
    }

    return permission;
  }

  async updatePermission(
    id: Uuid,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<void> {
    const permission = await this.getPermission(id);

    this.permissionRepository.merge(permission, updatePermissionDto);

    await this.permissionRepository.save(permission);
  }

  async deletePermission(id: Uuid): Promise<void> {
    const permission = await this.getPermission(id);

    await this.permissionRepository.remove(permission);
  }
}
