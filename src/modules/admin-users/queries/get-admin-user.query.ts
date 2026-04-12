import type { IQuery } from '@nestjs/cqrs';

export class GetAdminUserQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}
