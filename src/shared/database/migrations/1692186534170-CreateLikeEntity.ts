import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikeEntity1692186534170 implements MigrationInterface {
    name = 'CreateLikeEntity1692186534170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toVideoId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_b6284f1d47e920e04db146cae91" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_52fd6f9e2e4a15293587ddfe2be" FOREIGN KEY ("toVideoId") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_52fd6f9e2e4a15293587ddfe2be"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_b6284f1d47e920e04db146cae91"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
