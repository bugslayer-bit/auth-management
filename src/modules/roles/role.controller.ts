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
import { CreateRoleDto } from './dto/create-role.dto.ts';
import { RoleDto } from './dto/role.dto.ts';
import { RolesPageOptionsDto } from './dto/roles-page-options.dto.ts';
import { UpdateRoleDto } from './dto/update-role.dto.ts';
import { RoleService } from './role.service.ts';
import { RoleType } from '../../constants/role-type.ts';

@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const entity = await this.roleService.createRole(createRoleDto);

    return entity.toDto();
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  getRoles(
    @Query(new ValidationPipe({ transform: true })) pageOptionsDto: RolesPageOptionsDto,
  ): Promise<PageDto<RoleDto>> {
    return this.roleService.getRoles(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  async getRole(@UUIDParam('id') id: Uuid): Promise<RoleDto> {
    const entity = await this.roleService.getRole(id);

    return entity.toDto();
  }

  @Patch(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  updateRole(
    @UUIDParam('id') id: Uuid,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<void> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteRole(@UUIDParam('id') id: Uuid): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
