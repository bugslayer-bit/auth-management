import {
  EmailField,
  PasswordField,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class UserRegisterDto {
  @StringField()
  readonly name!: string;

  @StringFieldOptional()
  readonly cidNumber?: string;

  @EmailField()
  readonly email!: string;

  @StringFieldOptional()
  readonly contactNo?: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;
}
