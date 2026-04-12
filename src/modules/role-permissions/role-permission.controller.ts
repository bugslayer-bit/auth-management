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
import { CreateRolePermissionDto } from './dto/create-role-permission.dto.ts';
import { RolePermissionDto } from './dto/role-permission.dto.ts';
import { RolePermissionsPageOptionsDto } from './dto/role-permissions-page-options.dto.ts';
import { RolePermissionService } from './role-permission.service.ts';

@Controller('role-permissions')
@ApiTags('role-permissions')
export class RolePermissionController {
  constructor(private rolePermissionService: RolePermissionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRolePermission(
    @Body() createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermissionDto> {
    const entity = await this.rolePermissionService.createRolePermission(
      createRolePermissionDto,
    );

    return entity.toDto();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getRolePermissions(
    @Query() pageOptionsDto: RolePermissionsPageOptionsDto,
  ): Promise<PageDto<RolePermissionDto>> {
    return this.rolePermissionService.getRolePermissions(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRolePermission(
    @UUIDParam('id') id: Uuid,
  ): Promise<RolePermissionDto> {
    const entity = await this.rolePermissionService.getRolePermission(id);

    return entity.toDto();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteRolePermission(@UUIDParam('id') id: Uuid): Promise<void> {
    return this.rolePermissionService.deleteRolePermission(id);
  }
}
