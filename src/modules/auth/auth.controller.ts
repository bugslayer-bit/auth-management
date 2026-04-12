import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserDto } from '../user/dtos/user.dto.ts';
import { UserService } from '../user/user.service.ts';
import { AuthService } from './auth.service.ts';
import { LoginPayloadDto } from './dto/login-payload.dto.ts';
import { UserLoginDto } from './dto/user-login.dto.ts';
import { UserRegisterDto } from './dto/user-register.dto.ts';
import { AdminLoginDto } from './dto/admin-login.dto.ts';
import { AdminLoginPayloadDto } from './dto/admin-login-payload.dto.ts';

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
    description: 'User info with access token',
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
}
