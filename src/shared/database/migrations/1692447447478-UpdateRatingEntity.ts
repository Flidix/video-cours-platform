import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRatingEntity1692447447478 implements MigrationInterface {
    name = 'UpdateRatingEntity1692447447478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "courseId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "userId"`);
    }

}
