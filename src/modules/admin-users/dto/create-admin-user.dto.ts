import { RoleType } from '../../../constants/role-type.ts';
import { UserStatus } from '../../../constants/user-status.ts';
import {
  EmailField,
  EnumFieldOptional,
  PasswordField,
  StringField,
  StringFieldOptional,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class CreateAdminUserDto {
  @StringField()
  name!: string;

  @StringField()
  username!: string;

  @EnumFieldOptional(() => RoleType, { default: RoleType.ADMIN })
  role?: RoleType;

  @EmailField()
  email!: string;

  @PasswordField({ minLength: 6 })
  password!: string;

  @StringFieldOptional()
  contactNo?: string;

  @StringFieldOptional()
  division?: string;

  @EnumFieldOptional(() => UserStatus, { default: UserStatus.ACTIVE })
  status?: UserStatus;

  @UUIDFieldOptional({ each: true })
  roleIds?: Uuid[];
}
