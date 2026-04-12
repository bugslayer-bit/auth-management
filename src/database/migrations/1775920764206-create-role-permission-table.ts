import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolePermissionTable1775920764206
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "role_permission"
      (
        "id"            uuid      NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
        "role_id"       uuid      NOT NULL,
        "permission_id" uuid      NOT NULL,
        CONSTRAINT "UQ_role_permission_role_permission" UNIQUE ("role_id", "permission_id"),
        CONSTRAINT "PK_role_permission_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_role_permission_role" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_role_permission_permission" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "role_permission"');
  }
}
