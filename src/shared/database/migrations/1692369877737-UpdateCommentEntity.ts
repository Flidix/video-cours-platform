import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCommentEntity1692369877737 implements MigrationInterface {
    name = 'UpdateCommentEntity1692369877737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "commentsToComments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "userId" integer NOT NULL, "commentId" integer NOT NULL, "fromUserId" integer, "toCommentId" integer, CONSTRAINT "PK_315883f2bdfef91788fde069e35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "userId" integer NOT NULL, "fromUserId" integer, "toVideoId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "commentsToComments" ADD CONSTRAINT "FK_dc7de937cf1cc1edeaf19c94343" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentsToComments" ADD CONSTRAINT "FK_acd19df8c6e6445dac18e79916c" FOREIGN KEY ("toCommentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_747e23caefea71c850bcfbd0fdb" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1ffe1565d6b3b639ccc66dbd107" FOREIGN KEY ("toVideoId") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1ffe1565d6b3b639ccc66dbd107"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_747e23caefea71c850bcfbd0fdb"`);
        await queryRunner.query(`ALTER TABLE "commentsToComments" DROP CONSTRAINT "FK_acd19df8c6e6445dac18e79916c"`);
        await queryRunner.query(`ALTER TABLE "commentsToComments" DROP CONSTRAINT "FK_dc7de937cf1cc1edeaf19c94343"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "commentsToComments"`);
    }

}
