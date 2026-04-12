import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageDto } from '../../common/dto/page.dto.ts';
import { CreateRoleDto } from './dto/create-role.dto.ts';
import { RoleDto } from './dto/role.dto.ts';
import { RolesPageOptionsDto } from './dto/roles-page-options.dto.ts';
import { UpdateRoleDto } from './dto/update-role.dto.ts';
import { RoleNotFoundException } from './exceptions/role-not-found.exception.ts';
import { RoleEntity } from './role.entity.ts';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = this.roleRepository.create(createRoleDto);

    await this.roleRepository.save(role);

    return role;
  }

  async getRoles(
    pageOptionsDto: RolesPageOptionsDto,
  ): Promise<PageDto<RoleDto>> {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getRole(id: Uuid): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new RoleNotFoundException();
    }

    return role;
  }

  async updateRole(id: Uuid, updateRoleDto: UpdateRoleDto): Promise<void> {
    const role = await this.getRole(id);

    this.roleRepository.merge(role, updateRoleDto);

    await this.roleRepository.save(role);
  }

  async deleteRole(id: Uuid): Promise<void> {
    const role = await this.getRole(id);

    await this.roleRepository.remove(role);
  }
}
