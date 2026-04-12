import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1622299665807 implements MigrationInterface {
  name = 'createUsersTable1622299665807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')",
    );
    await queryRunner.query(
      "CREATE TYPE \"users_status_enum\" AS ENUM('ACTIVE', 'INACTIVE', 'LOCKED')",
    );
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"             uuid                 NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"     TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"     TIMESTAMP            NOT NULL DEFAULT now(),
        "name"           character varying,
        "cid_number"     character varying,
        "email"          character varying,
        "contact_no"     character varying,
        "role_type"      "users_role_enum"    NOT NULL DEFAULT 'USER',
        "last_logged_in" TIMESTAMP,
        "password"       character varying,
        "status"         "users_status_enum"  NOT NULL DEFAULT 'ACTIVE',
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_users_cid_number" UNIQUE ("cid_number"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "users_status_enum"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
