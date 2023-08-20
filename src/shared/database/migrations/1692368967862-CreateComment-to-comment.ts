import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentToComment1692368967862 implements MigrationInterface {
  name = 'CreateCommentToComment1692368967862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "commentsToComments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "userId" integer NOT NULL, "fromUserId" integer, "toCommentId" integer, CONSTRAINT "PK_315883f2bdfef91788fde069e35" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "commentsToComments" ADD CONSTRAINT "FK_dc7de937cf1cc1edeaf19c94343" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "commentsToComments" ADD CONSTRAINT "FK_acd19df8c6e6445dac18e79916c" FOREIGN KEY ("toCommentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "commentsToComments" DROP CONSTRAINT "FK_acd19df8c6e6445dac18e79916c"',
    );
    await queryRunner.query(
      'ALTER TABLE "commentsToComments" DROP CONSTRAINT "FK_dc7de937cf1cc1edeaf19c94343"',
    );
    await queryRunner.query('DROP TABLE "commentsToComments"');
  }
}
