import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714256306059 implements MigrationInterface {
    name = 'Init1714256306059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "dni" integer NOT NULL, "dni_type_id" integer NOT NULL, "gender_id" integer NOT NULL, "phone_number" integer NOT NULL, "email" character varying(255) NOT NULL, "alt_email" character varying(255), "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_027941f32603b418d9bf0db0e82" UNIQUE ("dni"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_3e407625f38eae246c15c330133" UNIQUE ("alt_email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
