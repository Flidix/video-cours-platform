import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoursToCategoryEntity1692256649585 implements MigrationInterface {
  name = 'CreateCoursToCategoryEntity1692256649585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "coursToCategory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "coursId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_feedf2937f5469a266da20a4e32" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "coursToCategory" ADD CONSTRAINT "FK_ca7b85fa7e18d55c2016925829b" FOREIGN KEY ("coursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "coursToCategory" ADD CONSTRAINT "FK_fb80b9126486b6563ae5fb68421" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "coursToCategory" DROP CONSTRAINT "FK_fb80b9126486b6563ae5fb68421"',
    );
    await queryRunner.query(
      'ALTER TABLE "coursToCategory" DROP CONSTRAINT "FK_ca7b85fa7e18d55c2016925829b"',
    );
    await queryRunner.query('DROP TABLE "coursToCategory"');
  }
}
