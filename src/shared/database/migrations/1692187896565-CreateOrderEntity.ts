import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderEntity1692187896565 implements MigrationInterface {
    name = 'CreateOrderEntity1692187896565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL DEFAULT '0', "isPaid" boolean NOT NULL DEFAULT false, "fromUserId" integer, "toCoursId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_27c08ecff3a802f57e5076922ca" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8103f8c5632a39a28d05d9bd919" FOREIGN KEY ("toCoursId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8103f8c5632a39a28d05d9bd919"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_27c08ecff3a802f57e5076922ca"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
