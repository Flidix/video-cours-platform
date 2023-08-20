import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoursEntity1692184679002 implements MigrationInterface {
  name = 'CreateCoursEntity1692184679002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "courses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "avatar" character varying NOT NULL, "price" integer NOT NULL DEFAULT \'0\', "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "courses" ADD CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "courses" DROP CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1"',
    );
    await queryRunner.query('DROP TABLE "courses"');
  }
}
