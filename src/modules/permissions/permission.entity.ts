import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { PermissionDto } from './dto/permission.dto.ts';

@Entity({ name: 'permissions' })
@UseDto(PermissionDto)
export class PermissionEntity extends AbstractEntity<PermissionDto> {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar' })
  action!: string;

  @Column({ type: 'varchar' })
  subject!: string;
}
