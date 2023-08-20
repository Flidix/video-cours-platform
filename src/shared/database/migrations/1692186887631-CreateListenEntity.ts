import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListenEntity1692186887631 implements MigrationInterface {
    name = 'CreateListenEntity1692186887631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listens" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toVideoId" integer, CONSTRAINT "PK_0c43bfff88a5f1d1d57b9da771b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listens" ADD CONSTRAINT "FK_5312d8af2ac8349618394a9ae35" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listens" ADD CONSTRAINT "FK_8a3f7f99c12c61afdd01eb5fb6e" FOREIGN KEY ("toVideoId") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listens" DROP CONSTRAINT "FK_8a3f7f99c12c61afdd01eb5fb6e"`);
        await queryRunner.query(`ALTER TABLE "listens" DROP CONSTRAINT "FK_5312d8af2ac8349618394a9ae35"`);
        await queryRunner.query(`DROP TABLE "listens"`);
    }

}
