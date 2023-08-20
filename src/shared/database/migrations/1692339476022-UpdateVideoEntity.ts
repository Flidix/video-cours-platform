import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVideoEntity1692339476022 implements MigrationInterface {
    name = 'UpdateVideoEntity1692339476022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_52fd6f9e2e4a15293587ddfe2be"`);
        await queryRunner.query(`ALTER TABLE "videos" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" RENAME COLUMN "toVideoId" TO "toCoursId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isOficial" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_14c531ac6b786511d7d1889700b" FOREIGN KEY ("toCoursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_14c531ac6b786511d7d1889700b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOficial"`);
        await queryRunner.query(`ALTER TABLE "likes" RENAME COLUMN "toCoursId" TO "toVideoId"`);
        await queryRunner.query(`ALTER TABLE "videos" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_52fd6f9e2e4a15293587ddfe2be" FOREIGN KEY ("toVideoId") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
