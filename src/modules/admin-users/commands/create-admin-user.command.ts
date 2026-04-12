import type { ICommand } from '@nestjs/cqrs';

import type { CreateAdminUserDto } from '../dto/create-admin-user.dto.ts';

export class CreateAdminUserCommand implements ICommand {
  constructor(
    public readonly createAdminUserDto: CreateAdminUserDto,
) {}
}
