import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1715228098344 implements MigrationInterface {
    name = 'Init1715228098344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gender" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dni_type" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_4a7fd2f0b6c36ac106e4c8eb269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "dni" bigint NOT NULL, "phone_number" bigint NOT NULL, "email" character varying(255) NOT NULL, "alt_email" character varying(255) NULL, "password" character varying NOT NULL, "status_id" integer, "gender_id" integer, "dniType_id" integer, CONSTRAINT "UQ_027941f32603b418d9bf0db0e82" UNIQUE ("dni"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_3e407625f38eae246c15c330133" UNIQUE ("alt_email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_users" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_6516a2e208664a508f5e2f7f284" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe845889e03e87003e6d9a06ca" ON "roles_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_de502d3ca59c0bfd32fa882939" ON "roles_users" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68a78cb22b6ba2cbcb58018bc54" FOREIGN KEY ("dniType_id") REFERENCES "dni_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_users" ADD CONSTRAINT "FK_fe845889e03e87003e6d9a06caa" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_users" ADD CONSTRAINT "FK_de502d3ca59c0bfd32fa8829393" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_users" DROP CONSTRAINT "FK_de502d3ca59c0bfd32fa8829393"`);
        await queryRunner.query(`ALTER TABLE "roles_users" DROP CONSTRAINT "FK_fe845889e03e87003e6d9a06caa"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68a78cb22b6ba2cbcb58018bc54"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6d4390ab1c0e8c86287d9f4c430"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de502d3ca59c0bfd32fa882939"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe845889e03e87003e6d9a06ca"`);
        await queryRunner.query(`DROP TABLE "roles_users"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "dni_type"`);
        await queryRunner.query(`DROP TABLE "gender"`);
    }

}
