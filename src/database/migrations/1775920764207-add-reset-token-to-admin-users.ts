import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetTokenToAdminUsers1775920764207
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_users" ADD COLUMN "reset_token" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_users" ADD COLUMN "reset_token_expiry" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_users" DROP COLUMN "reset_token_expiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_users" DROP COLUMN "reset_token"`,
    );
  }
}
