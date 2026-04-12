import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { UUIDField } from '../../../decorators/field.decorators.ts';
import type { UserRoleEntity } from '../user-role.entity.ts';

export class UserRoleDto extends AbstractDto {
  @UUIDField()
  userId!: Uuid;

  @UUIDField()
  roleId!: Uuid;

  constructor(userRole: UserRoleEntity) {
    super(userRole);
    this.userId = userRole.userId;
    this.roleId = userRole.roleId;
  }
}
