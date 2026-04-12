import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleEntity } from './user-role.entity.ts';
import { UserRoleService } from './user-role.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  controllers: [],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
