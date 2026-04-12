import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesTable1775920764203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "roles"
      (
        "id"          uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
        "name"        character varying NOT NULL,
        "desc"        character varying,
        CONSTRAINT "UQ_roles_name" UNIQUE ("name"),
        CONSTRAINT "PK_roles_id" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "roles"');
  }
}
