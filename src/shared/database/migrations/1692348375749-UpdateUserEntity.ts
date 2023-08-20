import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1692348375749 implements MigrationInterface {
    name = 'UpdateUserEntity1692348375749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "likesCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "likesCount"`);
    }

}
