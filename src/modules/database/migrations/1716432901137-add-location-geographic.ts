import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationGeographic1716432901137 implements MigrationInterface {
    name = 'AddLocationGeographic1716432901137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "geographic_location" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_ef4746d74ee5c544f7fe867de05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "alt_email" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "alt_email" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "geographic_location"`);
    }

}
