import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '../roles/role.entity.ts';
import { CreateAdminUserHandler } from './commands/create-admin-user.handler.ts';
import { AdminUserController } from './admin-user.controller.ts';
import { AdminUserEntity } from './admin-user.entity.ts';
import { AdminUserService } from './admin-user.service.ts';
import { GetAdminUserHandler } from './queries/get-admin-user.handler.ts';

const handlers = [CreateAdminUserHandler, GetAdminUserHandler];

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserEntity, RoleEntity])],
  providers: [AdminUserService, ...handlers],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule {}
