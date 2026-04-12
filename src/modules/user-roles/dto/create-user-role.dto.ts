import { UUIDField } from '../../../decorators/field.decorators.ts';

export class CreateUserRoleDto {
  @UUIDField()
  userId!: Uuid;

  @UUIDField()
  roleId!: Uuid;
}
