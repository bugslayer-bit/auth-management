import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { UserRoleDto } from './dto/user-role.dto.ts';

@Entity({ name: 'user_role' })
@UseDto(UserRoleDto)
export class UserRoleEntity extends AbstractEntity<UserRoleDto> {
  @Column({ type: 'uuid' })
  userId!: Uuid;

  @Column({ type: 'uuid' })
  roleId!: Uuid;
}
