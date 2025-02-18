import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { NewsletterEtity } from "./entities/newsletter.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";


@Module({
  imports: [
    TypeOrmModule.forFeature([ NewsletterEtity]),
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
  
  controllers: [NewsletterController],
  providers: [NewsletterService]
})
export class NewsletterModule {}
