import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteracion311718036624667 implements MigrationInterface {
    name = 'Iteracion311718036624667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "reason" character varying(255) NOT NULL, "request_date" TIMESTAMP NOT NULL DEFAULT now(), "attention_date" TIMESTAMP NOT NULL DEFAULT now(), "status_id" integer, "academic_program_id" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academic_programs" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "code" bigint NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "photoUrl" text, "status_id" integer, CONSTRAINT "UQ_4a92a6f0d9dc4267af3b7111053" UNIQUE ("name"), CONSTRAINT "UQ_58b2947ae0bcccee61b20b31b0d" UNIQUE ("code"), CONSTRAINT "UQ_6669bf8a3c9126468d9ddac6716" UNIQUE ("email"), CONSTRAINT "PK_27e387feaac71037c08230a06bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "academic_data" ALTER COLUMN "degree_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_40439e52fda158f5cced900a7bb" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_e8238e484f062abad86e8303913" FOREIGN KEY ("academic_program_id") REFERENCES "academic_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academic_programs" ADD CONSTRAINT "FK_832a4e1e7dfeb46576de2143c6c" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academic_programs" DROP CONSTRAINT "FK_832a4e1e7dfeb46576de2143c6c"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_e8238e484f062abad86e8303913"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_40439e52fda158f5cced900a7bb"`);
        await queryRunner.query(`ALTER TABLE "academic_data" ALTER COLUMN "degree_date" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "academic_programs"`);
        await queryRunner.query(`DROP TABLE "requests"`);
    }

}
