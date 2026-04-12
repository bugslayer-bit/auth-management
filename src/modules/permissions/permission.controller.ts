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
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto.ts';
import { Auth, UUIDParam } from '../../decorators/http.decorators.ts';
import { CreatePermissionDto } from './dto/create-permission.dto.ts';
import { PermissionDto } from './dto/permission.dto.ts';
import { PermissionsPageOptionsDto } from './dto/permissions-page-options.dto.ts';
import { UpdatePermissionDto } from './dto/update-permission.dto.ts';
import { PermissionService } from './permission.service.ts';
import { RoleType } from '../../constants/role-type.ts';

@Controller('permissions')
@ApiTags('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.CREATED)
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionDto> {
    const entity =
      await this.permissionService.createPermission(createPermissionDto);

    return entity.toDto();
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  getPermissions(
    @Query(new ValidationPipe({ transform: true })) pageOptionsDto: PermissionsPageOptionsDto,
  ): Promise<PageDto<PermissionDto>> {
    return this.permissionService.getPermissions(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  async getPermission(@UUIDParam('id') id: Uuid): Promise<PermissionDto> {
    const entity = await this.permissionService.getPermission(id);

    return entity.toDto();
  }

  @Patch(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePermission(
    @UUIDParam('id') id: Uuid,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<void> {
    return this.permissionService.updatePermission(id, updatePermissionDto);
  }

  @Delete(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePermission(@UUIDParam('id') id: Uuid): Promise<void> {
    return this.permissionService.deletePermission(id);
  }
}
