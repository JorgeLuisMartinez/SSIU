import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationUser1716436140398 implements MigrationInterface {
    name = 'UpdateRelationUser1716436140398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "geographic_location_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_decb479763191f368331323aeba" FOREIGN KEY ("geographic_location_id") REFERENCES "geographic_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_decb479763191f368331323aeba"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "geographic_location_id"`);
    }

}
