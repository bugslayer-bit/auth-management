import { EmailField } from '../../../decorators/field.decorators.ts';

export class ForgotPasswordDto {
  @EmailField()
  readonly email!: string;
}
