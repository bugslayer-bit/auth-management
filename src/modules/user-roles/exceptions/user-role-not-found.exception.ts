import { NotFoundException } from '@nestjs/common';

export class UserRoleNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.userRoleNotFound', error);
  }
}
