import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '../../common/dto/page.dto.ts';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto.ts';
import { RolePermissionDto } from './dto/role-permission.dto.ts';
import { RolePermissionsPageOptionsDto } from './dto/role-permissions-page-options.dto.ts';
import { RolePermissionNotFoundException } from './exceptions/role-permission-not-found.exception.ts';
import { RolePermissionEntity } from './role-permission.entity.ts';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async createRolePermission(
    createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermissionEntity> {
    const rolePermission = this.rolePermissionRepository.create(
      createRolePermissionDto,
    );

    await this.rolePermissionRepository.save(rolePermission);

    return rolePermission;
  }

  async getRolePermissions(
    pageOptionsDto: RolePermissionsPageOptionsDto,
  ): Promise<PageDto<RolePermissionDto>> {
    const queryBuilder =
      this.rolePermissionRepository.createQueryBuilder('rolePermission');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getRolePermission(id: Uuid): Promise<RolePermissionEntity> {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { id },
    });

    if (!rolePermission) {
      throw new RolePermissionNotFoundException();
    }

    return rolePermission;
  }

  async deleteRolePermission(id: Uuid): Promise<void> {
    const rolePermission = await this.getRolePermission(id);

    await this.rolePermissionRepository.remove(rolePermission);
  }
}
