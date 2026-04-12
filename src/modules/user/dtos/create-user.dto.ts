import {
  EmailField,
  PasswordField,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class CreateUserDto {
  @StringField()
  name!: string;

  @StringFieldOptional()
  cidNumber?: string;

  @EmailField()
  email!: string;

  @StringFieldOptional()
  contactNo?: string;

  @PasswordField({ minLength: 6 })
  password!: string;
}
