"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otp1702916785708 = void 0;
class otp1702916785708 {
    constructor() {
        this.name = 'otp1702916785708';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "otp" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp"`);
    }
}
exports.otp1702916785708 = otp1702916785708;
//# sourceMappingURL=1702916785708-otp.js.map