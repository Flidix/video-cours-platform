import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscribeEntity1692184299553 implements MigrationInterface {
  name = 'CreateSubscribeEntity1692184299553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "subscribes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toUserId" integer, CONSTRAINT "PK_f6d138fc1b7829ef9b9241c6008" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" ADD CONSTRAINT "FK_e1b7bc67a4c5e5d4516585caa32" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" ADD CONSTRAINT "FK_87b31be1d63f55661d688caf652" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "subscribes" DROP CONSTRAINT "FK_87b31be1d63f55661d688caf652"',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" DROP CONSTRAINT "FK_e1b7bc67a4c5e5d4516585caa32"',
    );
    await queryRunner.query('DROP TABLE "subscribes"');
  }
}
