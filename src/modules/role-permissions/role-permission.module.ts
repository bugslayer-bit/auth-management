import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermissionEntity } from './role-permission.entity.ts';
import { RolePermissionService } from './role-permission.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity])],
  controllers: [],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
