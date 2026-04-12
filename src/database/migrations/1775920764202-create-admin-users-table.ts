import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminUsersTable1775920764202 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"admin_users_role_enum\" AS ENUM('USER', 'ADMIN')",
    );

     await queryRunner.query(
      "CREATE TYPE \"status_enum\" AS ENUM('ACTIVE', 'INACTIVE', 'LOCKED')",
    );
    await queryRunner.query(`
      CREATE TABLE "admin_users"
      (
        "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "name" character varying,
        "username"  character varying,
        "role_type"  "admin_users_role_enum" NOT NULL DEFAULT 'ADMIN',
        "email"      character varying,
        "password"   character varying,
        "contact_no"      character varying,
        "division"     character varying,
        "last_logged_in" TIMESTAMP,
        "reset_token"  character varying,
        "reset_token_expiry" TIMESTAMP,
        "status"       "status_enum" NOT NULL DEFAULT 'ACTIVE',
        CONSTRAINT "UQ_admin_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_admin_users_id" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "admin_users"');
    await queryRunner.query('DROP TYPE "admin_users_role_enum"');
    await queryRunner.query('DROP TYPE "status_enum"');
  }
}
