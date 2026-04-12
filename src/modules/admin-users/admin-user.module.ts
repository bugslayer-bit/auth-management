import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleModule } from '../user-roles/user-role.module.ts';
import { CreateAdminUserHandler } from './commands/create-admin-user.handler.ts';
import { AdminUserController } from './admin-user.controller.ts';
import { AdminUserEntity } from './admin-user.entity.ts';
import { AdminUserService } from './admin-user.service.ts';
import { GetAdminUserHandler } from './queries/get-admin-user.handler.ts';

const handlers = [CreateAdminUserHandler, GetAdminUserHandler];

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserEntity]), UserRoleModule],
  providers: [AdminUserService, ...handlers],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule {}
