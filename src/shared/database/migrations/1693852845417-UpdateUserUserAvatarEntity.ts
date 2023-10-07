import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserUserAvatarEntity1693852845417 implements MigrationInterface {
  name = 'UpdateUserUserAvatarEntity1693852845417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toCoursId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "listens" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toVideoId" integer, CONSTRAINT "PK_0c43bfff88a5f1d1d57b9da771b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "subscribes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toUserId" integer, CONSTRAINT "PK_f6d138fc1b7829ef9b9241c6008" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "stars" integer NOT NULL, "userId" integer NOT NULL, "courseId" integer NOT NULL, "fromUserId" integer, "toCoursId" integer, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "userAvatar" character varying NOT NULL DEFAULT \'https://course-platform.s3.eu-north-1.amazonaws.com/userDefaultAvatar/1_W35QUSvGpcLuxPo3SRTH4w.webp\'',
    );
    await queryRunner.query(
      'ALTER TABLE "likes" ADD CONSTRAINT "FK_b6284f1d47e920e04db146cae91" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "likes" ADD CONSTRAINT "FK_14c531ac6b786511d7d1889700b" FOREIGN KEY ("toCoursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "listens" ADD CONSTRAINT "FK_5312d8af2ac8349618394a9ae35" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "listens" ADD CONSTRAINT "FK_8a3f7f99c12c61afdd01eb5fb6e" FOREIGN KEY ("toVideoId") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" ADD CONSTRAINT "FK_e1b7bc67a4c5e5d4516585caa32" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" ADD CONSTRAINT "FK_87b31be1d63f55661d688caf652" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "ratings" ADD CONSTRAINT "FK_fd94d05641b3a6bdabf02aca740" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "ratings" ADD CONSTRAINT "FK_6df31c7dd33f03d20cd28e3b996" FOREIGN KEY ("toCoursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ratings" DROP CONSTRAINT "FK_6df31c7dd33f03d20cd28e3b996"',
    );
    await queryRunner.query(
      'ALTER TABLE "ratings" DROP CONSTRAINT "FK_fd94d05641b3a6bdabf02aca740"',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" DROP CONSTRAINT "FK_87b31be1d63f55661d688caf652"',
    );
    await queryRunner.query(
      'ALTER TABLE "subscribes" DROP CONSTRAINT "FK_e1b7bc67a4c5e5d4516585caa32"',
    );
    await queryRunner.query(
      'ALTER TABLE "listens" DROP CONSTRAINT "FK_8a3f7f99c12c61afdd01eb5fb6e"',
    );
    await queryRunner.query(
      'ALTER TABLE "listens" DROP CONSTRAINT "FK_5312d8af2ac8349618394a9ae35"',
    );
    await queryRunner.query('ALTER TABLE "likes" DROP CONSTRAINT "FK_14c531ac6b786511d7d1889700b"');
    await queryRunner.query('ALTER TABLE "likes" DROP CONSTRAINT "FK_b6284f1d47e920e04db146cae91"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "userAvatar"');
    await queryRunner.query('DROP TABLE "ratings"');
    await queryRunner.query('DROP TABLE "subscribes"');
    await queryRunner.query('DROP TABLE "listens"');
    await queryRunner.query('DROP TABLE "likes"');
  }
}
