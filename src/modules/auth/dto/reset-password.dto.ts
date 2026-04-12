import { PasswordField, StringField } from '../../../decorators/field.decorators.ts';

export class ResetPasswordDto {
  @StringField()
  readonly token!: string;

  @PasswordField({ minLength: 6 })
  readonly newPassword!: string;
}
