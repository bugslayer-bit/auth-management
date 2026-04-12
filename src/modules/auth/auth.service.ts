import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validateHash } from '../../common/utils.ts';
import type { RoleType } from '../../constants/role-type.ts';
import { TokenType } from '../../constants/token-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { AdminUserNotFoundException } from '../../modules/admin-users/exceptions/admin-user-not-found.exception.ts';
import { AdminUserEntity } from '../../modules/admin-users/admin-user.entity.ts';
import { AdminUserService } from '../../modules/admin-users/admin-user.service.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import { MailService } from '../../shared/services/mail.service.ts';
import { UserEntity } from '../user/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import type { ChangePasswordDto } from './dto/change-password.dto.ts';
import type { ForgotPasswordDto } from './dto/forgot-password.dto.ts';
import type { ResetPasswordDto } from './dto/reset-password.dto.ts';
import { TokenPayloadDto } from './dto/token-payload.dto.ts';
import type { UserLoginDto } from './dto/user-login.dto.ts';
import type { AdminLoginDto } from './dto/admin-login.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
    private adminUserService: AdminUserService,
    private mailService: MailService,
    @InjectRepository(AdminUserEntity)
    private adminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: Uuid;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      token: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      cidNumber: userLoginDto.cidNumber,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }

  async validateAdminUser(
    adminLoginDto: AdminLoginDto,
  ): Promise<AdminUserEntity> {
    const user = await this.adminUserService.findOne({
      username: adminLoginDto.username,
    });

    const isPasswordValid = await validateHash(
      adminLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new AdminUserNotFoundException();
    }

    user!.lastLoggedIn = new Date();
    await this.adminUserRepository.save(user!);

    return user!;
  }

  async changeAdminPassword(
    adminUser: AdminUserEntity,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const isPasswordValid = await validateHash(
      changePasswordDto.currentPassword,
      adminUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('error.invalidCurrentPassword');
    }

    adminUser.password = changePasswordDto.newPassword;

    await this.adminUserRepository.save(adminUser);
  }

  async forgotAdminPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    const adminUser = await this.adminUserService.findOne({
      email: forgotPasswordDto.email,
    });

    if (!adminUser) {
      return;
    }

    const resetToken = String(
      Math.floor(100_000 + Math.random() * 900_000),
    );
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 15);

    adminUser.resetToken = resetToken;
    adminUser.resetTokenExpiry = expiry;

    await this.adminUserRepository.save(adminUser);

    await this.mailService.sendResetPasswordEmail(
      adminUser.email!,
      resetToken,
    );
  }

  async resetAdminPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const adminUser = await this.adminUserRepository.findOne({
      where: { resetToken: resetPasswordDto.token },
    });

    if (!adminUser) {
      throw new BadRequestException('error.invalidOrExpiredResetToken');
    }

    if (
      !adminUser.resetTokenExpiry ||
      adminUser.resetTokenExpiry < new Date()
    ) {
      adminUser.resetToken = null;
      adminUser.resetTokenExpiry = null;

      await this.adminUserRepository.save(adminUser);

      throw new BadRequestException('error.invalidOrExpiredResetToken');
    }

    adminUser.password = resetPasswordDto.newPassword;
    adminUser.resetToken = null;
    adminUser.resetTokenExpiry = null;

    await this.adminUserRepository.save(adminUser);
  }
}
