import {
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class UpdateRoleDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  description?: string;
}
