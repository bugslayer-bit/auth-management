import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleTable1775920764205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_role"
      (
        "id"         uuid      NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id"    uuid      NOT NULL,
        "role_id"    uuid      NOT NULL,
        CONSTRAINT "UQ_user_role_user_role" UNIQUE ("user_id", "role_id"),
        CONSTRAINT "PK_user_role_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_role_admin_user" FOREIGN KEY ("user_id") REFERENCES "admin_users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_user_role_role" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user_role"');
  }
}
