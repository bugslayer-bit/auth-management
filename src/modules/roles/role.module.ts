import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermissionModule } from '../role-permissions/role-permission.module.ts';
import { RoleController } from './role.controller.ts';
import { RoleEntity } from './role.entity.ts';
import { RoleService } from './role.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), RolePermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
