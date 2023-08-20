import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentEntity1692185867657 implements MigrationInterface {
    name = 'CreateCommentEntity1692185867657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "fromUserId" integer, "toVideoId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_747e23caefea71c850bcfbd0fdb" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1ffe1565d6b3b639ccc66dbd107" FOREIGN KEY ("toVideoId") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1ffe1565d6b3b639ccc66dbd107"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_747e23caefea71c850bcfbd0fdb"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
