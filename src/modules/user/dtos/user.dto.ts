import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleType } from '../../../constants/role-type.ts';
import { UserStatus } from '../../../constants/user-status.ts';
import {
  DateFieldOptional,
  EmailFieldOptional,
  EnumField,
  EnumFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { UserEntity } from '../user.entity.ts';

export class UserDto extends AbstractDto {
  @StringFieldOptional({ nullable: true })
  name?: string | null;

  @StringFieldOptional({ nullable: true })
  cidNumber?: string | null;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  contactNo?: string | null;

  @EnumField(() => RoleType)
  roleType!: RoleType;

  @DateFieldOptional({ nullable: true })
  lastLoggedIn?: Date | null;

  @EnumFieldOptional(() => UserStatus)
  status?: UserStatus;

  constructor(user: UserEntity) {
    super(user);
    this.name = user.name;
    this.cidNumber = user.cidNumber;
    this.email = user.email;
    this.contactNo = user.contactNo;
    this.roleType = user.roleType;
    this.lastLoggedIn = user.lastLoggedIn;
    this.status = user.status;
  }
}
