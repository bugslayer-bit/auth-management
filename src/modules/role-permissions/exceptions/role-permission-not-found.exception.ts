import { NotFoundException } from '@nestjs/common';

export class RolePermissionNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.rolePermissionNotFound', error);
  }
}
