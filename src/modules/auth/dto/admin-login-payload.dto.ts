import { AdminUserDto } from '../../../modules/admin-users/dto/admin-user.dto.ts';
import { ClassField } from '../../../decorators/field.decorators.ts';
import { TokenPayloadDto } from './token-payload.dto.ts';

export class AdminLoginPayloadDto {
  @ClassField(() => AdminUserDto)
  user: AdminUserDto;

  @ClassField(() => TokenPayloadDto)
  accessToken: TokenPayloadDto;

  constructor(user: AdminUserDto, token: TokenPayloadDto) {
    this.user = user;
    this.accessToken = token;
  }
}
