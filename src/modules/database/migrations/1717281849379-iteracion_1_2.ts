import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteracion121717281849379 implements MigrationInterface {
    name = 'Iteracion121717281849379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gender" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dni_type" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_4a7fd2f0b6c36ac106e4c8eb269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_sector" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_32bcc71e7d54c93132295268c28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employment_data" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "phone_number" bigint NOT NULL, "address" character varying(255) NOT NULL, "job_role" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "nationality" character varying(50) NOT NULL, "company_sector_id" integer, "user_id" integer, CONSTRAINT "UQ_cdbe55a91b2c0fa94d48e644f1e" UNIQUE ("email"), CONSTRAINT "PK_6bb756a9db4b1726e312d6e214a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "dni" bigint NOT NULL, "phone_number" bigint NOT NULL, "email" character varying(255) NOT NULL, "alt_email" character varying(255) NOT NULL, "password" character varying NOT NULL, "status_id" integer, "gender_id" integer, "dniType_id" integer, CONSTRAINT "UQ_027941f32603b418d9bf0db0e82" UNIQUE ("dni"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_3e407625f38eae246c15c330133" UNIQUE ("alt_email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study_types" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_ccff190ac325521c8339f7a4183" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academic_data" ("id" SERIAL NOT NULL, "academic_title" character varying(255) NOT NULL, "institution_name" character varying(255) NOT NULL, "nationality" character varying(50) NOT NULL, "degree_date" TIMESTAMP NOT NULL, "company_sector_id" integer, "user_id" integer, CONSTRAINT "PK_461f2d5b8260198f2a65f0246f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_users" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_6516a2e208664a508f5e2f7f284" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe845889e03e87003e6d9a06ca" ON "roles_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_de502d3ca59c0bfd32fa882939" ON "roles_users" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "employment_data" ADD CONSTRAINT "FK_be0b4de9ca8e9802b4b3c680979" FOREIGN KEY ("company_sector_id") REFERENCES "company_sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employment_data" ADD CONSTRAINT "FK_be8eebc1f3216ac40b8fcf3c3ad" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68a78cb22b6ba2cbcb58018bc54" FOREIGN KEY ("dniType_id") REFERENCES "dni_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academic_data" ADD CONSTRAINT "FK_e34f6a34f868ae2b1cfcc16aa6c" FOREIGN KEY ("company_sector_id") REFERENCES "study_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academic_data" ADD CONSTRAINT "FK_891cc8e9d5db82f48f4c1c27036" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_users" ADD CONSTRAINT "FK_fe845889e03e87003e6d9a06caa" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_users" ADD CONSTRAINT "FK_de502d3ca59c0bfd32fa8829393" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_users" DROP CONSTRAINT "FK_de502d3ca59c0bfd32fa8829393"`);
        await queryRunner.query(`ALTER TABLE "roles_users" DROP CONSTRAINT "FK_fe845889e03e87003e6d9a06caa"`);
        await queryRunner.query(`ALTER TABLE "academic_data" DROP CONSTRAINT "FK_891cc8e9d5db82f48f4c1c27036"`);
        await queryRunner.query(`ALTER TABLE "academic_data" DROP CONSTRAINT "FK_e34f6a34f868ae2b1cfcc16aa6c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68a78cb22b6ba2cbcb58018bc54"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f"`);
        await queryRunner.query(`ALTER TABLE "employment_data" DROP CONSTRAINT "FK_be8eebc1f3216ac40b8fcf3c3ad"`);
        await queryRunner.query(`ALTER TABLE "employment_data" DROP CONSTRAINT "FK_be0b4de9ca8e9802b4b3c680979"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de502d3ca59c0bfd32fa882939"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe845889e03e87003e6d9a06ca"`);
        await queryRunner.query(`DROP TABLE "roles_users"`);
        await queryRunner.query(`DROP TABLE "academic_data"`);
        await queryRunner.query(`DROP TABLE "study_types"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "employment_data"`);
        await queryRunner.query(`DROP TABLE "company_sector"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "dni_type"`);
        await queryRunner.query(`DROP TABLE "gender"`);
    }

}
