import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  ClassFieldOptional,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import { PermissionDto } from '../../permissions/dto/permission.dto.ts';
import type { RoleEntity } from '../role.entity.ts';

export class RoleDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringFieldOptional({ nullable: true })
  description?: string | null;

  @ClassFieldOptional(() => PermissionDto, { each: true })
  permissions?: PermissionDto[];

  constructor(role: RoleEntity) {
    super(role);
    this.name = role.name;
    this.description = role.description;
    this.permissions = role.permissions?.map((p) => p.toDto());
  }
}
