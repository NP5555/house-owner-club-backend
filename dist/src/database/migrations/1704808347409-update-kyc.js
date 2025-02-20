"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKyc1704808347409 = void 0;
class updateKyc1704808347409 {
    constructor() {
        this.name = 'updateKyc1704808347409';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP COLUMN "iban"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP COLUMN "nic"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD "pubkey" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP COLUMN "pubkey"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD "nic" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD "iban" character varying NOT NULL`);
    }
}
exports.updateKyc1704808347409 = updateKyc1704808347409;
//# sourceMappingURL=1704808347409-update-kyc.js.map