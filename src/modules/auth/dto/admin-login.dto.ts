import {
  StringField,
} from '../../../decorators/field.decorators.ts';

export class AdminLoginDto {
  @StringField()
  readonly username!: string;

  @StringField()
  readonly password!: string;
}
