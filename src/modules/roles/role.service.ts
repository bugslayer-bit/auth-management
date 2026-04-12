import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { PageDto } from '../../common/dto/page.dto.ts';
import { RolePermissionService } from '../role-permissions/role-permission.service.ts';
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
    private rolePermissionService: RolePermissionService,
  ) {}

  @Transactional()
  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { permissionIds, ...rest } = createRoleDto;
    const role = this.roleRepository.create(rest);

    await this.roleRepository.save(role);

    if (permissionIds?.length) {
      await this.rolePermissionService.replaceRolePermissions(
        role.id,
        permissionIds,
      );
    }

    return role;
  }

  async getRoles(
    pageOptionsDto: RolesPageOptionsDto,
  ): Promise<PageDto<RoleDto>> {
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission');

       queryBuilder.searchByString(pageOptionsDto?.q ?? '', [
        'role.name',
        'role.description',
      ])
      .orderBy('role.createdAt', pageOptionsDto.order);
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getRole(id: Uuid): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new RoleNotFoundException();
    }

    return role;
  }

  @Transactional()
  async updateRole(id: Uuid, updateRoleDto: UpdateRoleDto): Promise<void> {
    const role = await this.getRole(id);
    const { permissionIds, ...rest } = updateRoleDto;

    this.roleRepository.merge(role, rest);

    await this.roleRepository.save(role);

    if (permissionIds) {
      await this.rolePermissionService.replaceRolePermissions(
        id,
        permissionIds,
      );
    }
  }

  async deleteRole(id: Uuid): Promise<void> {
    const role = await this.getRole(id);

    await this.roleRepository.remove(role);
  }
}
