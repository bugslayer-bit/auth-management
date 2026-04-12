import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RoleType } from '../../constants/role-type.ts';
import { TokenType } from '../../constants/token-type.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { AdminUserEntity } from '../admin-users/admin-user.entity.ts';
import { AdminUserService } from '../admin-users/admin-user.service.ts';
import type { UserEntity } from '../user/user.entity.ts';
import { UserService } from '../user/user.service.ts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
    private userService: UserService,
    private adminUserService: AdminUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: Uuid;
    role: RoleType;
    type: TokenType;
  }): Promise<UserEntity | AdminUserEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    if (args.role === RoleType.ADMIN) {
      const adminUser = await this.adminUserService.findOne({
        id: args.userId as never,
        roleType: args.role,
      });

      if (!adminUser) {
        throw new UnauthorizedException();
      }

      return adminUser;
    }

    const user = await this.userService.findOne({
      id: args.userId as never,
      roleType: args.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
