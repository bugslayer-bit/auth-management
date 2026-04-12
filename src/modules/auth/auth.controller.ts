import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants/role-type.ts';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import type { AdminUserEntity } from '../admin-users/admin-user.entity.ts';
import { UserDto } from '../user/dtos/user.dto.ts';
import { UserService } from '../user/user.service.ts';
import { AuthService } from './auth.service.ts';
import { AdminLoginDto } from './dto/admin-login.dto.ts';
import { AdminLoginPayloadDto } from './dto/admin-login-payload.dto.ts';
import { ChangePasswordDto } from './dto/change-password.dto.ts';
import { ForgotPasswordDto } from './dto/forgot-password.dto.ts';
import { LoginPayloadDto } from './dto/login-payload.dto.ts';
import { ResetPasswordDto } from './dto/reset-password.dto.ts';
import { UserLoginDto } from './dto/user-login.dto.ts';
import { UserRegisterDto } from './dto/user-register.dto.ts';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.roleType,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AdminLoginPayloadDto,
    description: 'Admin user info with access token',
  })
  async adminUserLogin(
    @Body() adminLoginDto: AdminLoginDto,
  ): Promise<AdminLoginPayloadDto> {
    const userEntity = await this.authService.validateAdminUser(adminLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.roleType,
    });

    return new AdminLoginPayloadDto(userEntity.toDto(), token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser.toDto();
  }

  @Post('admin/change-password')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Password changed successfully' })
  async changePassword(
    @AuthUser() user: AdminUserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    await this.authService.changeAdminPassword(user, changePasswordDto);
  }

  @Post('admin/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Reset email sent if account exists' })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    await this.authService.forgotAdminPassword(forgotPasswordDto);
  }

  @Post('admin/reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Password reset successfully' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    await this.authService.resetAdminPassword(resetPasswordDto);
  }
}
