import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermissionController } from './role-permission.controller.ts';
import { RolePermissionEntity } from './role-permission.entity.ts';
import { RolePermissionService } from './role-permission.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
