import { MigrationInterface, QueryRunner } from "typeorm";

export class updateKyc1704808347409 implements MigrationInterface {
    name = 'updateKyc1704808347409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP COLUMN "iban"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP COLUMN "nic"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD "pubkey" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP COLUMN "pubkey"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD "nic" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD "iban" character varying NOT NULL`);
    }

}
