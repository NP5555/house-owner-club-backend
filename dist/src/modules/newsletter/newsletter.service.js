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
        const queryBuilder = this.newsletterEntityRepository.createQueryBuilder("newsletter");
        queryBuilder.orWhere("newsletter.email = :email", {
            email: createNewsletterDto.email,
        });
        const subscriber = await queryBuilder.getOne();
        if (subscriber) {
            throw new common_1.HttpException("Already Subscribed", common_1.HttpStatus.CONFLICT);
        }
        const subscribe = this.newsletterEntityRepository.create(createNewsletterDto);
        await this.newsletterEntityRepository.save(subscribe);
    }
    async sendNews(sendNews) {
        console.log("🚀 ~ file: newsletter.service.ts:43 ~ NewsletterService ~ sendNews ~ sendNews:", sendNews);
        const queryBuilder = this.newsletterEntityRepository.createQueryBuilder("newsletter");
        const subscribers = await queryBuilder.getMany();
        const emails = subscribers.map((sub) => sub.email);
        await this.mailerService.sendMail({
            to: emails,
            from: '"noreply" <hello@hoc.com>',
            subject: "Home Owners club - Newsletter",
            template: "../../../templates/transactional.hbs",
            context: {
                sendNews: sendNews.news,
            },
        });
        return emails;
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
            return true;
        }
        else {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
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