import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { UUIDField } from '../../../decorators/field.decorators.ts';
import type { RolePermissionEntity } from '../role-permission.entity.ts';

export class RolePermissionDto extends AbstractDto {
  @UUIDField()
  roleId!: Uuid;

  @UUIDField()
  permissionId!: Uuid;

  constructor(rolePermission: RolePermissionEntity) {
    super(rolePermission);
    this.roleId = rolePermission.roleId;
    this.permissionId = rolePermission.permissionId;
  }
}
