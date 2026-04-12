import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { UserRoleEntity } from './user-role.entity.ts';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  findByUserId(userId: Uuid): Promise<UserRoleEntity[]> {
    return this.userRoleRepository.find({ where: { userId } });
  }

  async createUserRole(userId: Uuid, roleId: string): Promise<UserRoleEntity> {
    const userRole = this.userRoleRepository.create({
      userId,
      roleId,
    });

    await this.userRoleRepository.save(userRole);

    return userRole;
  }

  async replaceUserRoles(userId: Uuid, roleIds: string[]): Promise<void> {
    await this.userRoleRepository.delete({ userId });

    if (roleIds.length > 0) {
      const entities = roleIds.map((roleId) =>
        this.userRoleRepository.create({ userId, roleId }),
      );

      await this.userRoleRepository.save(entities);
    }
  }
}
