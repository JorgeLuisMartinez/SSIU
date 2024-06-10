import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteracion321718061318628 implements MigrationInterface {
    name = 'Iteracion321718061318628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_e8238e484f062abad86e8303913"`);
        await queryRunner.query(`ALTER TABLE "academic_programs" RENAME COLUMN "password" TO "user_id"`);
        await queryRunner.query(`CREATE TABLE "stages" ("id" SERIAL NOT NULL, "description" character varying(12) NOT NULL, "start_date" TIMESTAMP NOT NULL, "finish_date" TIMESTAMP NOT NULL, "type_MDI" character varying(48) NOT NULL, "status_id" integer, "academic_program_id" integer, CONSTRAINT "PK_16efa0f8f5386328944769b9e6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "academic_program_id"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "stage_id" integer`);
        await queryRunner.query(`ALTER TABLE "academic_data" ALTER COLUMN "degree_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "academic_programs" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "academic_programs" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "alt_email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "attention_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "attention_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "academic_programs" ADD CONSTRAINT "FK_2c198cd6685fde5fc6bfe5943c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_c8b9e801ae97e2c9ffc6d5f5104" FOREIGN KEY ("stage_id") REFERENCES "stages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stages" ADD CONSTRAINT "FK_d60f3f469cd79fef1d527c09008" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stages" ADD CONSTRAINT "FK_9742b11483d7420ba81789b67b1" FOREIGN KEY ("academic_program_id") REFERENCES "academic_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stages" DROP CONSTRAINT "FK_9742b11483d7420ba81789b67b1"`);
        await queryRunner.query(`ALTER TABLE "stages" DROP CONSTRAINT "FK_d60f3f469cd79fef1d527c09008"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_c8b9e801ae97e2c9ffc6d5f5104"`);
        await queryRunner.query(`ALTER TABLE "academic_programs" DROP CONSTRAINT "FK_2c198cd6685fde5fc6bfe5943c1"`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "attention_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "attention_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "alt_email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_programs" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "academic_programs" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academic_data" ALTER COLUMN "degree_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "stage_id"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "academic_program_id" integer`);
        await queryRunner.query(`DROP TABLE "stages"`);
        await queryRunner.query(`ALTER TABLE "academic_programs" RENAME COLUMN "user_id" TO "password"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_e8238e484f062abad86e8303913" FOREIGN KEY ("academic_program_id") REFERENCES "academic_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
