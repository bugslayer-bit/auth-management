import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { StringField } from '../../../decorators/field.decorators.ts';
import type { PermissionEntity } from '../permission.entity.ts';

export class PermissionDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringField()
  action!: string;

  @StringField()
  subject!: string;

  constructor(permission: PermissionEntity) {
    super(permission);
    this.name = permission.name;
    this.action = permission.action;
    this.subject = permission.subject;
  }
}
