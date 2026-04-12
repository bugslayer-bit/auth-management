import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { RoleEntity } from '../role.entity.ts';

export class RoleDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringFieldOptional({ nullable: true })
  description?: string | null;

  constructor(role: RoleEntity) {
    super(role);
    this.name = role.name;
    this.description = role.description;
  }
}
