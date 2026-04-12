import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';

import { generateHash } from '../common/utils.ts';
import { AdminUserEntity } from '../modules/admin-users/admin-user.entity.ts';

@EventSubscriber()
export class AdminUserSubscriber
  implements EntitySubscriberInterface<AdminUserEntity>
{
  listenTo(): typeof AdminUserEntity {
    return AdminUserEntity;
  }

  beforeInsert(event: InsertEvent<AdminUserEntity>): void {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<AdminUserEntity>): void {
    const entity = event.entity as AdminUserEntity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password!);
    }
  }
}
