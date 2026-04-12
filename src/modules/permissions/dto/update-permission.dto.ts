import { StringFieldOptional } from '../../../decorators/field.decorators.ts';

export class UpdatePermissionDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  action?: string;

  @StringFieldOptional()
  subject?: string;
}
