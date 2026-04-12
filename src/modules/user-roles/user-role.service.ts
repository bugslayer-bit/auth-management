import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '../../common/dto/page.dto.ts';
import { CreateUserRoleDto } from './dto/create-user-role.dto.ts';
import { UserRoleDto } from './dto/user-role.dto.ts';
import { UserRolesPageOptionsDto } from './dto/user-roles-page-options.dto.ts';
import { UserRoleNotFoundException } from './exceptions/user-role-not-found.exception.ts';
import { UserRoleEntity } from './user-role.entity.ts';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleEntity> {
    const userRole = this.userRoleRepository.create(createUserRoleDto);

    await this.userRoleRepository.save(userRole);

    return userRole;
  }

  async getUserRoles(
    pageOptionsDto: UserRolesPageOptionsDto,
  ): Promise<PageDto<UserRoleDto>> {
    const queryBuilder =
      this.userRoleRepository.createQueryBuilder('userRole');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUserRole(id: Uuid): Promise<UserRoleEntity> {
    const userRole = await this.userRoleRepository.findOne({ where: { id } });

    if (!userRole) {
      throw new UserRoleNotFoundException();
    }

    return userRole;
  }

  async deleteUserRole(id: Uuid): Promise<void> {
    const userRole = await this.getUserRole(id);

    await this.userRoleRepository.remove(userRole);
  }
}
