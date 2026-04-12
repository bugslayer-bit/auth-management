import { StringField } from '../../../decorators/field.decorators.ts';

export class CreatePermissionDto {
  @StringField()
  name!: string;

  @StringField()
  action!: string;

  @StringField()
  subject!: string;
}
