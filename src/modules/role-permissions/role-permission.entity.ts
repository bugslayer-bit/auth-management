import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { RolePermissionDto } from './dto/role-permission.dto.ts';

@Entity({ name: 'role_permission' })
@UseDto(RolePermissionDto)
export class RolePermissionEntity extends AbstractEntity<RolePermissionDto> {
  @Column({ type: 'uuid' })
  roleId!: Uuid;

  @Column({ type: 'uuid' })
  permissionId!: Uuid;
}
