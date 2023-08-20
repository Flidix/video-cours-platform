import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBuedCoursEntity1692438545845 implements MigrationInterface {
    name = 'UpdateBuedCoursEntity1692438545845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buedCourses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "courseId" integer NOT NULL, "fromUserId" integer, "coursId" integer, CONSTRAINT "PK_f5daa124c52e6f1d52e488ab21a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buedCourses" ADD CONSTRAINT "FK_6225d2854b5384a586037bca933" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buedCourses" ADD CONSTRAINT "FK_e13212265e97f18dc44313631e9" FOREIGN KEY ("coursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buedCourses" DROP CONSTRAINT "FK_e13212265e97f18dc44313631e9"`);
        await queryRunner.query(`ALTER TABLE "buedCourses" DROP CONSTRAINT "FK_6225d2854b5384a586037bca933"`);
        await queryRunner.query(`DROP TABLE "buedCourses"`);
    }

}
