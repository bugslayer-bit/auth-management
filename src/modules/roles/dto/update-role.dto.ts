import {
  StringFieldOptional,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class UpdateRoleDto {
  @StringFieldOptional()
  readonly name?: string;

  @StringFieldOptional()
  readonly description?: string;

  @UUIDFieldOptional({ each: true })
  readonly permissionIds?: string[];
}
