import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto.ts';
import { UUIDParam } from '../../decorators/http.decorators.ts';
import { CreateUserRoleDto } from './dto/create-user-role.dto.ts';
import { UserRoleDto } from './dto/user-role.dto.ts';
import { UserRolesPageOptionsDto } from './dto/user-roles-page-options.dto.ts';
import { UserRoleService } from './user-role.service.ts';

@Controller('user-roles')
@ApiTags('user-roles')
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUserRole(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDto> {
    const entity = await this.userRoleService.createUserRole(createUserRoleDto);

    return entity.toDto();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getUserRoles(
    @Query() pageOptionsDto: UserRolesPageOptionsDto,
  ): Promise<PageDto<UserRoleDto>> {
    return this.userRoleService.getUserRoles(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserRole(@UUIDParam('id') id: Uuid): Promise<UserRoleDto> {
    const entity = await this.userRoleService.getUserRole(id);

    return entity.toDto();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserRole(@UUIDParam('id') id: Uuid): Promise<void> {
    return this.userRoleService.deleteUserRole(id);
  }
}
