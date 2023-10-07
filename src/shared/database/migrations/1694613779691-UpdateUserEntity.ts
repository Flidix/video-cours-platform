import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntity1694613779691 implements MigrationInterface {
  name = 'UpdateUserEntity1694613779691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ADD "money" integer NOT NULL DEFAULT \'0\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "money"');
  }
}
