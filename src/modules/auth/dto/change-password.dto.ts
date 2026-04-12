import { PasswordField, StringField } from '../../../decorators/field.decorators.ts';

export class ChangePasswordDto {
  @StringField()
  readonly currentPassword!: string;

  @PasswordField({ minLength: 6 })
  readonly newPassword!: string;
}
