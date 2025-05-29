"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const newsletter_entity_1 = require("./entities/newsletter.entity");
const abstract_service_1 = require("../../common/abstract.service");
const mailer_1 = require("@nestjs-modules/mailer");
let NewsletterService = class NewsletterService extends abstract_service_1.AbstractService {
    constructor(newsletterEntityRepository, mailerService) {
        super(newsletterEntityRepository);
        this.newsletterEntityRepository = newsletterEntityRepository;
        this.mailerService = mailerService;
    }
    async subscribeNewsletter(createNewsletterDto) {
        console.log("Attempting to subscribe:", createNewsletterDto.email);
        const queryBuilder = this.newsletterEntityRepository.createQueryBuilder("newsletter");
        queryBuilder.orWhere("newsletter.email = :email", {
            email: createNewsletterDto.email,
        });
        const subscriber = await queryBuilder.getOne();
        if (subscriber) {
            console.log("Email already subscribed:", createNewsletterDto.email);
            throw new common_1.HttpException("Already Subscribed", common_1.HttpStatus.CONFLICT);
        }
        const subscribe = this.newsletterEntityRepository.create(createNewsletterDto);
        await this.newsletterEntityRepository.save(subscribe);
        console.log("Successfully subscribed:", createNewsletterDto.email);
        return { message: "Successfully subscribed to newsletter", email: createNewsletterDto.email };
    }
    async sendNews(sendNews) {
        console.log("\n=== Starting Email Test ===");
        console.log("Content to send:", sendNews.news);
        try {
            console.log("Testing SMTP connection...");
            try {
                console.log("Attempting to send test email...");
                const testEmailData = {
                    to: "ngs.naeemashraf@gmail.com",
                    from: '"Home Owners Club" <hello@hoc.com>',
                    subject: "SMTP Test - Home Owners Club",
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
            }
            catch (emailError) {
                console.error("\n=== Email Error Details ===");
                console.error("Error Code:", emailError.code);
                console.error("Error Response:", emailError.response);
                console.error("Error Message:", emailError.message);
                console.error("Stack Trace:", emailError.stack);
                console.error("Full Error Object:", JSON.stringify(emailError, null, 2));
                throw new common_1.HttpException({
                    message: "Failed to send email",
                    error: emailError.message,
                    code: emailError.code,
                    response: emailError.response
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            console.error("\n=== Service Error ===");
            console.error("Error:", error);
            throw new common_1.HttpException({
                message: "Newsletter service error",
                error: error.message,
                stack: error.stack
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllEmails(pageOptionsDto) {
        const queryBuilder = this.newsletterEntityRepository.createQueryBuilder("newsletter");
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("newsletter.createdAt", pageOptionsDto.order);
        }
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteByEmail(email) {
        const queryBuilder = this.newsletterEntityRepository.createQueryBuilder("newsletter");
        queryBuilder.orWhere("newsletter.email = :email", {
            email: email,
        });
        const subscriber = await queryBuilder.getOne();
        if (subscriber) {
            await this.newsletterEntityRepository.delete(subscriber.id);
            return { message: "Successfully unsubscribed", email };
        }
        else {
            throw new common_1.HttpException("Email not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(newsletter_entity_1.NewsletterEtity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], NewsletterService);
exports.NewsletterService = NewsletterService;
//# sourceMappingURL=newsletter.service.js.map