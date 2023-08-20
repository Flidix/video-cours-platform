import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVideoEntity1692185543109 implements MigrationInterface {
  name = 'CreateVideoEntity1692185543109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "videos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "video" character varying NOT NULL, "description" character varying NOT NULL, "name" character varying NOT NULL, "likesCount" integer NOT NULL DEFAULT \'0\', "fromUserId" integer, "toCoursId" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "videos" ADD CONSTRAINT "FK_87dc182d75b84fc3d2f5d80f374" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "videos" ADD CONSTRAINT "FK_76965e2b9665f04ae5c22b2f044" FOREIGN KEY ("toCoursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "videos" DROP CONSTRAINT "FK_76965e2b9665f04ae5c22b2f044"',
    );
    await queryRunner.query(
      'ALTER TABLE "videos" DROP CONSTRAINT "FK_87dc182d75b84fc3d2f5d80f374"',
    );
    await queryRunner.query('DROP TABLE "videos"');
  }
}
