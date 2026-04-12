import { NotFoundException } from '@nestjs/common';

export class AdminUserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('Admin user not found', error);
  }
}
