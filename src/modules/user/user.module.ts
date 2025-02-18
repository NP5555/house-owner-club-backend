import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { CreateSettingsHandler } from "./commands/create-settings.command";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { UserSettingsEntity } from "./user-settings.entity";
import { UserKYCEntity } from "../user-kyc/entities/user-kyc.entity";
// import { AgentLandEntity } from '../agent-land/entities/agent-land.entity';
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

export const handlers = [CreateSettingsHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserSettingsEntity, UserKYCEntity]),
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: "smtp.gmail.com",
          secure: false,
          auth: {
            user: "ngs.naeemashraf@gmail.com",
            pass: "ABCDRTYU990",
},
          logger: true,
          debug: true
        },
        defaults: {
          from: `"No Reply" <hello@hoc.com`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, ...handlers],
})
export class UserModule {}
