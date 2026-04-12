import { UUIDField } from '../../../decorators/field.decorators.ts';

export class CreateRolePermissionDto {
  @UUIDField()
  roleId!: Uuid;

  @UUIDField()
  permissionId!: Uuid;
}
