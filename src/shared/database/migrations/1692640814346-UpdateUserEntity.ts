import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1692640814346 implements MigrationInterface {
    name = 'UpdateUserEntity1692640814346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastLoginAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLoginAt"`);
    }

}
