import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleType } from '../../../constants/role-type.ts';
import { UserStatus } from '../../../constants/user-status.ts';
import {
  ClassFieldOptional,
  DateFieldOptional,
  EmailFieldOptional,
  EnumField,
  EnumFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import { RoleDto } from '../../roles/dto/role.dto.ts';
import type { AdminUserEntity } from '../admin-user.entity.ts';

export type IAdminUserDtoOptions = Partial<{ excludePassword: boolean }>;

export class AdminUserDto extends AbstractDto {
  @StringFieldOptional({ nullable: true })
  name?: string | null;

  @StringFieldOptional({ nullable: true })
  username?: string | null;

  @EnumField(() => RoleType)
  role!: RoleType;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  contactNo?: string | null;

  @StringFieldOptional({ nullable: true })
  division?: string | null;

  @DateFieldOptional({ nullable: true })
  lastLoggedIn?: Date | null;

  @EnumFieldOptional(() => UserStatus)
  status?: UserStatus;

  @ClassFieldOptional(() => RoleDto, { each: true })
  roles?: RoleDto[];

  constructor(adminUser: AdminUserEntity) {
    super(adminUser);
    this.name = adminUser.name;
    this.username = adminUser.username;
    this.role = adminUser.role;
    this.email = adminUser.email;
    this.contactNo = adminUser.contactNo;
    this.division = adminUser.division;
    this.lastLoggedIn = adminUser.lastLoggedIn;
    this.status = adminUser.status;
    this.roles = adminUser.roles?.map((role) => role.toDto());
  }
}
