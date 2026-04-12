import { RoleType } from '../../../constants/role-type.ts';
import { UserStatus } from '../../../constants/user-status.ts';
import {
  EmailFieldOptional,
  EnumFieldOptional,
  PasswordFieldOptional,
  StringFieldOptional,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class UpdateAdminUserDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  username?: string;

  @EnumFieldOptional(() => RoleType)
  role?: RoleType;

  @EmailFieldOptional()
  email?: string;

  @PasswordFieldOptional({ minLength: 6 })
  password?: string;

  @StringFieldOptional()
  contactNo?: string;

  @StringFieldOptional()
  division?: string;

  @EnumFieldOptional(() => UserStatus)
  status?: UserStatus;

  @UUIDFieldOptional({ each: true })
  roleIds?: Uuid[];
}
