import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRatingEntity1692185102490 implements MigrationInterface {
    name = 'CreateRatingEntity1692185102490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "stars" integer NOT NULL, "fromUserId" integer, "toCoursId" integer, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "stars" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_fd94d05641b3a6bdabf02aca740" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_6df31c7dd33f03d20cd28e3b996" FOREIGN KEY ("toCoursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_6df31c7dd33f03d20cd28e3b996"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_fd94d05641b3a6bdabf02aca740"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "stars"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
    }

}
