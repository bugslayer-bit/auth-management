import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { RolePermissionEntity } from './role-permission.entity.ts';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  findByRoleId(roleId: RolePermissionEntity['roleId']): Promise<RolePermissionEntity[]> {
    return this.rolePermissionRepository.find({ where: { roleId } });
  }

  async createRolePermission( 
    roleId: RolePermissionEntity['roleId'],
    permissionId: RolePermissionEntity['permissionId'],
  ): Promise<RolePermissionEntity> {
    const rolePermission = this.rolePermissionRepository.create({
      roleId,
      permissionId,
    });

    await this.rolePermissionRepository.save(rolePermission);

    return rolePermission;
  }

  async replaceRolePermissions(
    roleId: Uuid,
    permissionIds: string[],
  ): Promise<void> {
    await this.rolePermissionRepository.delete({ roleId });

    if (permissionIds.length > 0) {
      const entities = permissionIds.map((permissionId) =>
        this.rolePermissionRepository.create({ roleId, permissionId }),
      );

      await this.rolePermissionRepository.save(entities);
    }
  }
}
