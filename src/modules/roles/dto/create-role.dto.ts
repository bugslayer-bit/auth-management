import {
  StringField,
  StringFieldOptional,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class CreateRoleDto {
  @StringField()
  readonly name!: string;

  @StringFieldOptional()
  readonly description?: string;

  @UUIDFieldOptional({ each: true })
  readonly permissionIds?: string[];
}
