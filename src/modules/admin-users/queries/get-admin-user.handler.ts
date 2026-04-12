import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminUserEntity } from '../admin-user.entity.ts';
import { AdminUserNotFoundException } from '../exceptions/admin-user-not-found.exception.ts';
import { GetAdminUserQuery } from './get-admin-user.query.ts';

@QueryHandler(GetAdminUserQuery)
export class GetAdminUserHandler
  implements IQueryHandler<GetAdminUserQuery, AdminUserEntity>
{
  constructor(
    @InjectRepository(AdminUserEntity)
    private adminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async execute(query: GetAdminUserQuery): Promise<AdminUserEntity> {
    const entity = await this.adminUserRepository.findOne({
      where: { id: query.id },
      relations: ['roles'],
    });

    if (!entity) {
      throw new AdminUserNotFoundException();
    }

    return entity;
  }
}
