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
            host: config.get('MAIL_HOST', 'smtp.gmail.com'),
            port: config.get('MAIL_PORT', 587),
            secure: false,
            auth: {
                user: config.get('MAIL_USER', 'your-email@example.com'),
                pass: config.get('MAIL_PASSWORD', 'your-app-password'),
            },
            tls: {
              rejectUnauthorized: false
            }
          },
          defaults: {
            from: `"No Reply" <${config.get('MAIL_FROM', 'hello@hoc.com')}>`,
          },
          template: {
            dir: join(__dirname, "..", "..", "templates"),
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
