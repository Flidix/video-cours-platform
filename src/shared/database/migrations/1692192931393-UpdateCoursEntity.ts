import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCoursEntity1692192931393 implements MigrationInterface {
    name = 'UpdateCoursEntity1692192931393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "isOficial" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "isOficial"`);
    }

}
