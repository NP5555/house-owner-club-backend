import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { NewsletterDto } from "./dto/newsletter.dto";
import { NewsletterEtity } from "./entities/newsletter.entity";
import { AbstractService } from "../../common/abstract.service";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { SendNewsDto } from "./dto/sendNews.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class NewsletterService extends AbstractService<NewsletterEtity> {
  constructor(
    @InjectRepository(NewsletterEtity)
    private newsletterEntityRepository: Repository<NewsletterEtity>,
    private mailerService: MailerService
  ) {
    super(newsletterEntityRepository);
  }

  async subscribeNewsletter(
    createNewsletterDto: CreateNewsletterDto
  ): Promise<CreateNewsletterDto | any> {
    console.log("Attempting to subscribe:", createNewsletterDto.email);
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );

    queryBuilder.orWhere("newsletter.email = :email", {
      email: createNewsletterDto.email,
    });

    const subscriber: any = await queryBuilder.getOne();
    if (subscriber) {
      console.log("Email already subscribed:", createNewsletterDto.email);
      throw new HttpException("Already Subscribed", HttpStatus.CONFLICT);
    }
    const subscribe = this.newsletterEntityRepository.create(
      createNewsletterDto
    );
    await this.newsletterEntityRepository.save(subscribe);
    console.log("Successfully subscribed:", createNewsletterDto.email);
    return { message: "Successfully subscribed to newsletter", email: createNewsletterDto.email };
  }

  async sendNews(sendNews: SendNewsDto): Promise<SendNewsDto | any> {
    console.log("\n=== Starting Email Test ===");
    console.log("Content to send:", sendNews.news);
    
    try {
      // First test the SMTP connection
      console.log("Testing SMTP connection...");
      
      try {
        console.log("Attempting to send test email...");
        const testEmailData = {
          to: "ngs.naeemashraf@gmail.com",
          from: '"House Owners Club" <hello@hoc.com>',
          subject: "SMTP Test - House Owners Club",
          text: "This is a test email to verify SMTP configuration.",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
              <h2 style="color: #333;">SMTP Test Email</h2>
              <p style="color: #666;">This is a test email to verify the SMTP configuration is working.</p>
              <p style="color: #666;">Test message: ${sendNews.news}</p>
              <p style="color: #888; font-size: 12px;">Sent at: ${new Date().toISOString()}</p>
            </div>
          `
        };
        
        console.log("Email configuration:", {
          to: testEmailData.to,
          from: testEmailData.from,
          subject: testEmailData.subject
        });
        
        const result = await this.mailerService.sendMail(testEmailData);
        console.log("Email sent successfully!", result);
        
        return { 
          success: true, 
          message: "Test email sent successfully",
          testEmail: testEmailData.to,
          emailInfo: result
        };
        
      } catch (emailError) {
        console.error("\n=== Email Error Details ===");
        console.error("Error Code:", emailError.code);
        console.error("Error Response:", emailError.response);
        console.error("Error Message:", emailError.message);
        console.error("Stack Trace:", emailError.stack);
        console.error("Full Error Object:", JSON.stringify(emailError, null, 2));
        
        throw new HttpException({
          message: "Failed to send email",
          error: emailError.message,
          code: emailError.code,
          response: emailError.response
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      console.error("\n=== Service Error ===");
      console.error("Error:", error);
      throw new HttpException({
        message: "Newsletter service error",
        error: error.message,
        stack: error.stack
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllEmails(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<NewsletterDto>> {
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );

    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("newsletter.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }

  async deleteByEmail(email: string): Promise<NewsletterEtity | any> {
    const queryBuilder = this.newsletterEntityRepository.createQueryBuilder(
      "newsletter"
    );

    queryBuilder.orWhere("newsletter.email = :email", {
      email: email,
    });

    const subscriber: any = await queryBuilder.getOne();
    if (subscriber) {
      await this.newsletterEntityRepository.delete(subscriber.id);
      return { message: "Successfully unsubscribed", email };
    } else {
      throw new HttpException("Email not found", HttpStatus.NOT_FOUND);
    }
  }
}
