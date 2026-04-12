import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import type { PageDto } from '../../common/dto/page.dto';
import { CreateAdminUserDto } from './dto/create-admin-user.dto.ts';
import type { AdminUserDto } from './dto/admin-user.dto.ts';
import { AdminUserPageOptionsDto } from './dto/admin-user-page-options.dto.ts';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto.ts';
import { AdminUserService } from './admin-user.service.ts';
import { Auth, UUIDParam } from '../../decorators/http.decorators.ts';
import { RoleType } from '../../constants/role-type.ts';

@Controller('admin-users')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

@Post()
@Auth([RoleType.ADMIN])
@HttpCode(HttpStatus.CREATED)
async createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto) {
  const entity = await this.adminUserService.createAdminUser(createAdminUserDto);

  return entity.toDto();
}

@Get()
@Auth([RoleType.ADMIN])
@HttpCode(HttpStatus.OK)
getAdminUsers(@Query() adminUserPageOptionsDto: AdminUserPageOptionsDto): Promise<PageDto<AdminUserDto>> {
  return this.adminUserService.getAdminUsers(adminUserPageOptionsDto);
}

@Get(':id')
@Auth([RoleType.ADMIN])
@HttpCode(HttpStatus.OK)
async getAdminUser(@UUIDParam('id') id: Uuid): Promise<AdminUserDto> {
  const entity = await this.adminUserService.getAdminUser(id);

  return entity.toDto();
}

@Patch(':id')
@Auth([RoleType.ADMIN])
@HttpCode(HttpStatus.ACCEPTED)
updateAdminUser(
@UUIDParam('id') id: Uuid,
  @Body() updateAdminUserDto: UpdateAdminUserDto,
): Promise<void> {
  return this.adminUserService.updateAdminUser(id, updateAdminUserDto);
}

@Delete(':id')
@Auth([RoleType.ADMIN])
@HttpCode(HttpStatus.ACCEPTED)
async deleteAdminUser(@UUIDParam('id') id: Uuid): Promise<void> {
  await this.adminUserService.deleteAdminUser(id);
}
}
