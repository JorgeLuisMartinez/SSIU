import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteracion31717744406622 implements MigrationInterface {
    name = 'Iteracion31717744406622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_question" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_fd6ac99ef646347fb63bff172cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variable" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "status_id" integer, CONSTRAINT "PK_f4e200785984484787e6b47e6fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "indicator" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "status_id" integer, "variable_id" integer, CONSTRAINT "PK_4693fe4c2cb912a71e05c589e7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "description" character varying(1000) NOT NULL, "type_question_id" integer, "status_id" integer, "indicator_id" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "alt_email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variable" ADD CONSTRAINT "FK_136dd8b81150054228c0dddb6f9" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "indicator" ADD CONSTRAINT "FK_f6efeeeca3da39b472bec7bf574" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "indicator" ADD CONSTRAINT "FK_71ec1a847ca2cc0f70b5eafefa5" FOREIGN KEY ("variable_id") REFERENCES "variable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_fb767b9d7c083122855c4177432" FOREIGN KEY ("type_question_id") REFERENCES "type_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_f7e0912846ebac98d8d5f30f74f" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_244639bb29d2ff7da5f7c5b6bb9" FOREIGN KEY ("indicator_id") REFERENCES "indicator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_244639bb29d2ff7da5f7c5b6bb9"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_f7e0912846ebac98d8d5f30f74f"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_fb767b9d7c083122855c4177432"`);
        await queryRunner.query(`ALTER TABLE "indicator" DROP CONSTRAINT "FK_71ec1a847ca2cc0f70b5eafefa5"`);
        await queryRunner.query(`ALTER TABLE "indicator" DROP CONSTRAINT "FK_f6efeeeca3da39b472bec7bf574"`);
        await queryRunner.query(`ALTER TABLE "variable" DROP CONSTRAINT "FK_136dd8b81150054228c0dddb6f9"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "alt_email" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "indicator"`);
        await queryRunner.query(`DROP TABLE "variable"`);
        await queryRunner.query(`DROP TABLE "type_question"`);
    }

}
