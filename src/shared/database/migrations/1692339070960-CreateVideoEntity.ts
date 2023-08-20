import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVideoEntity1692339070960 implements MigrationInterface {
    name = 'CreateVideoEntity1692339070960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "usersId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "usersId"`);
    }

}
