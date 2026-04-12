import type { Relation } from 'typeorm';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { RoleType } from '../../constants/role-type.ts';
import { UserStatus } from '../../constants/user-status.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { RoleEntity } from '../roles/role.entity.ts';
import { AdminUserDto } from './dto/admin-user.dto.ts';

@Entity({ name: 'admin_users' })
@UseDto(AdminUserDto)
export class AdminUserEntity extends AbstractEntity<
  AdminUserDto
> {
  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true })
  username!: string | null;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.ADMIN })
  role!: RoleType;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true })
  password!: string | null;

  @Column({ type: 'varchar', nullable: true })
  contactNo!: string | null;

  @Column({ type: 'varchar', nullable: true })
  division!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  lastLoggedIn!: Date | null;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles?: Relation<RoleEntity[]>;
}
