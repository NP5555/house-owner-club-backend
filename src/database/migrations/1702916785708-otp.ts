import { MigrationInterface, QueryRunner } from "typeorm";

export class otp1702916785708 implements MigrationInterface {
    name = 'otp1702916785708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "otp" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp"`);
    }

}
