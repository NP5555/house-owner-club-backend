import { MigrationInterface, QueryRunner } from "typeorm";

export class migratons1701703621062 implements MigrationInterface {
    name = 'migratons1701703621062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_kyc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "street" character varying NOT NULL, "state" character varying NOT NULL, "postal_code" character varying NOT NULL, "mobile_number" character varying NOT NULL, "company" character varying NOT NULL, "iban" character varying NOT NULL, "nic" character varying NOT NULL, "certificates" character varying NOT NULL, "passport_image" character varying, "nic_front_image" character varying, "nic_back_image" character varying, "signature_image" character varying NOT NULL, "is_passport" boolean NOT NULL, "experience" character varying NOT NULL, "source_of_income" character varying NOT NULL, "risk_profile" character varying NOT NULL, "user_id" uuid NOT NULL, "status" character varying DEFAULT 'pending', CONSTRAINT "REL_53ae38d2ed5bc33a3cb7e3fb1e" UNIQUE ("user_id"), CONSTRAINT "PK_96852e5a0116c49c1507faae57a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "wallet" character varying NOT NULL, "token_id" character varying NOT NULL, "type_id" uuid NOT NULL, "user_id" uuid NOT NULL, "buyer_id" uuid, "agent_wallet" character varying NOT NULL, "agent_land_id" uuid NOT NULL, "project_id" uuid NOT NULL, "signature_time" character varying, "signatures" character varying, "is_signed" boolean DEFAULT false, "update_installment" boolean NOT NULL DEFAULT false, "is_sold" boolean DEFAULT false, CONSTRAINT "PK_34ecbce508fa8a98d0f23d9372a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token_id" character varying NOT NULL, "user_id" uuid NOT NULL, "buyer_id" uuid, "buy_id" uuid, "type_id" uuid NOT NULL, "bid_time" character varying, "price" character varying, "agent_land_id" uuid NOT NULL, "project_id" uuid NOT NULL, "signature_time" character varying, "signatures" character varying, "highest_bidder" character varying, "is_signed" boolean DEFAULT false, "is_listed" boolean DEFAULT false, "is_trade_initiated" boolean DEFAULT false, "is_sold" boolean DEFAULT false, "is_auction" boolean DEFAULT false, "is_all_installment_paid" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "blockchain_id" integer, "description" character varying NOT NULL, "project_id" uuid NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token_id" character varying NOT NULL, "rent_amount" character varying NOT NULL, "security_amount" character varying NOT NULL, "is_accept_by_tenant" boolean NOT NULL DEFAULT false, "request_for_back" boolean NOT NULL DEFAULT false, "is_onchain" boolean NOT NULL DEFAULT false, "last_payment_time" character varying NOT NULL, "current_payment_time" character varying, "accept_rent_time" character varying, "duration" character varying NOT NULL, "is_vacation_rent" boolean NOT NULL DEFAULT false, "currency_id" uuid NOT NULL, "tenant_id" uuid, "owner_id" uuid NOT NULL, "project_id" uuid NOT NULL, "agent_land_id" uuid NOT NULL, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "is_native" boolean NOT NULL, "token_address" character varying, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "project_id" uuid NOT NULL, "token_id" integer NOT NULL, "tag" character varying, "transaction_hash" character varying NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('CLOSE', 'OPEN')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" double precision NOT NULL DEFAULT '0', "description" character varying NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'OPEN', "nft_address" character varying NOT NULL, "sale_address" character varying NOT NULL, "category_id" uuid NOT NULL, "currency_id" uuid NOT NULL, "developer_id" uuid NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."agent_land_status_enum" AS ENUM('UNSOLD', 'SOLD', 'IN_PROCESS')`);
        await queryRunner.query(`CREATE TABLE "agent_land" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token_id" character varying NOT NULL, "type_id" uuid NOT NULL, "developer_id" uuid NOT NULL, "agent_id" uuid NOT NULL, "project_id" uuid NOT NULL, "youtube_links" text, "land_image" text, "status" "public"."agent_land_status_enum" NOT NULL DEFAULT 'UNSOLD', CONSTRAINT "PK_7865c341246bed380ea664e80d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentCatalogue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "document" character varying NOT NULL, "name" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "PK_03a17dc229eff289da3c2edbd45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN', 'DEVELOPER', 'AGENT', 'VALIDATOR')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "email" character varying, "password" character varying, "phone" character varying, "avatar" character varying, "is_kyc" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "wallet" character varying, "referral_code" character varying, "referred_by" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_email_verified" boolean NOT NULL DEFAULT false, "is_phone_verified" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "area" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, CONSTRAINT "PK_036bb790d1d19efeacfd2f3740c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requestDocuments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_6abe07f405904d71562895a7865" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_kyc" ADD CONSTRAINT "FK_53ae38d2ed5bc33a3cb7e3fb1e3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buys" ADD CONSTRAINT "FK_73d47b3c3d66c64525e715fadfd" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buys" ADD CONSTRAINT "FK_7ec971d754dee323a0842edd4b5" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buys" ADD CONSTRAINT "FK_6d690a7123e83d1fecb948e9ee3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buys" ADD CONSTRAINT "FK_b3ffd72591e5db95c9092cc85a8" FOREIGN KEY ("agent_land_id") REFERENCES "agent_land"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_dcbb5b75fc624b18f37ca8775ed" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_a8ff153f9c87cae262caac5db34" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_ac40608b8665839bcbb69ab510d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_e225307662777ebc2eabe20752f" FOREIGN KEY ("agent_land_id") REFERENCES "agent_land"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "types" ADD CONSTRAINT "FK_9a74b255955477718054cb81951" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_a643a4f2e1ab6a1c08e83ba2bb4" FOREIGN KEY ("tenant_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_6266a818c0e2740e3b3fc20f8f6" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_c78d14a462c840ceb82bef63a00" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_6c06bbdd40689285ee435154d5c" FOREIGN KEY ("agent_land_id") REFERENCES "agent_land"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_889c2c7cea500749ab2134be4c6" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_9a04e1feb675f37ea6a344f809e" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c1345700580c6c6b17200647bcc" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_34f6a7287d6509c5c6511035f9a" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_7bc486132eac301a4abc39a532d" FOREIGN KEY ("developer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "agent_land" ADD CONSTRAINT "FK_bd9b9790b8abbb73dca159cbb3b" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_land" ADD CONSTRAINT "FK_84bfe2e8de18920157b16a1ae2b" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_land" ADD CONSTRAINT "FK_d7e29004879c723fbd61c2f161d" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "agent_land" ADD CONSTRAINT "FK_e1f6cd9bfcc8d30ea3138d33dc8" FOREIGN KEY ("developer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "documentCatalogue" ADD CONSTRAINT "FK_e4d61f4e7f7b88bb0e2463a865d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "requestDocuments" ADD CONSTRAINT "FK_a9bc7d95cb0769665778af9b130" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requestDocuments" DROP CONSTRAINT "FK_a9bc7d95cb0769665778af9b130"`);
        await queryRunner.query(`ALTER TABLE "documentCatalogue" DROP CONSTRAINT "FK_e4d61f4e7f7b88bb0e2463a865d"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`);
        await queryRunner.query(`ALTER TABLE "agent_land" DROP CONSTRAINT "FK_e1f6cd9bfcc8d30ea3138d33dc8"`);
        await queryRunner.query(`ALTER TABLE "agent_land" DROP CONSTRAINT "FK_d7e29004879c723fbd61c2f161d"`);
        await queryRunner.query(`ALTER TABLE "agent_land" DROP CONSTRAINT "FK_84bfe2e8de18920157b16a1ae2b"`);
        await queryRunner.query(`ALTER TABLE "agent_land" DROP CONSTRAINT "FK_bd9b9790b8abbb73dca159cbb3b"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_7bc486132eac301a4abc39a532d"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_34f6a7287d6509c5c6511035f9a"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c1345700580c6c6b17200647bcc"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_9a04e1feb675f37ea6a344f809e"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_889c2c7cea500749ab2134be4c6"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_6c06bbdd40689285ee435154d5c"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_c78d14a462c840ceb82bef63a00"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_6266a818c0e2740e3b3fc20f8f6"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_a643a4f2e1ab6a1c08e83ba2bb4"`);
        await queryRunner.query(`ALTER TABLE "types" DROP CONSTRAINT "FK_9a74b255955477718054cb81951"`);
        await queryRunner.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_e225307662777ebc2eabe20752f"`);
        await queryRunner.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_ac40608b8665839bcbb69ab510d"`);
        await queryRunner.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_a8ff153f9c87cae262caac5db34"`);
        await queryRunner.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_dcbb5b75fc624b18f37ca8775ed"`);
        await queryRunner.query(`ALTER TABLE "buys" DROP CONSTRAINT "FK_b3ffd72591e5db95c9092cc85a8"`);
        await queryRunner.query(`ALTER TABLE "buys" DROP CONSTRAINT "FK_6d690a7123e83d1fecb948e9ee3"`);
        await queryRunner.query(`ALTER TABLE "buys" DROP CONSTRAINT "FK_7ec971d754dee323a0842edd4b5"`);
        await queryRunner.query(`ALTER TABLE "buys" DROP CONSTRAINT "FK_73d47b3c3d66c64525e715fadfd"`);
        await queryRunner.query(`ALTER TABLE "user_kyc" DROP CONSTRAINT "FK_53ae38d2ed5bc33a3cb7e3fb1e3"`);
        await queryRunner.query(`DROP TABLE "requestDocuments"`);
        await queryRunner.query(`DROP TABLE "newsletter"`);
        await queryRunner.query(`DROP TABLE "area"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "documentCatalogue"`);
        await queryRunner.query(`DROP TABLE "documents"`);
        await queryRunner.query(`DROP TABLE "agent_land"`);
        await queryRunner.query(`DROP TYPE "public"."agent_land_status_enum"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "rent"`);
        await queryRunner.query(`DROP TABLE "types"`);
        await queryRunner.query(`DROP TABLE "trade"`);
        await queryRunner.query(`DROP TABLE "buys"`);
        await queryRunner.query(`DROP TABLE "user_kyc"`);
    }

}
