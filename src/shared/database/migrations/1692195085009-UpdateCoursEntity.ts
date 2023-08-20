import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCoursEntity1692195085009 implements MigrationInterface {
    name = 'UpdateCoursEntity1692195085009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
