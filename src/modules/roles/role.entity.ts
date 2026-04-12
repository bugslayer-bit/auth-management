import type { Relation } from 'typeorm';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { PermissionEntity } from '../permissions/permission.entity.ts';
import { RoleDto } from './dto/role.dto.ts';

@Entity({ name: 'roles' })
@UseDto(RoleDto)
export class RoleEntity extends AbstractEntity<RoleDto> {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string | null;

  @ManyToMany(() => PermissionEntity)
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions?: Relation<PermissionEntity[]>;
}
