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
exports.NewsletterController = void 0;
const common_1 = require("@nestjs/common");
const newsletter_service_1 = require("./newsletter.service");
const decorators_1 = require("../../decorators");
const swagger_1 = require("@nestjs/swagger");
const newsletter_dto_1 = require("./dto/newsletter.dto");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const constants_1 = require("../../constants");
const create_newsletter_dto_1 = require("./dto/create-newsletter.dto");
const sendNews_dto_1 = require("./dto/sendNews.dto");
let NewsletterController = class NewsletterController {
    constructor(service) {
        this.service = service;
    }
    async subscribe(createTypeDto, res) {
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Subscribed",
            data: await this.service.subscribeNewsletter(createTypeDto),
        });
    }
    async sendNews(sendNewsDto, res) {
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "News Sent",
            data: await this.service.sendNews(sendNewsDto),
        });
    }
    async findAll(pageOptionsDto, res) {
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Record Found",
            subscribers: await this.service.getAllEmails(pageOptionsDto),
        });
    }
    async remove(email, res) {
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Unsubscribed",
            data: await this.service.deleteByEmail(email),
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Subscribe to the newsletter",
        type: create_newsletter_dto_1.CreateNewsletterDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_newsletter_dto_1.CreateNewsletterDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)("/news"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "News Sent",
        type: sendNews_dto_1.SendNewsDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendNews_dto_1.SendNewsDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "sendNews", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)([constants_1.RoleType.ADMIN]),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get subscriber emails",
        type: newsletter_dto_1.NewsletterDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":email"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Unsubscribed",
        type: newsletter_dto_1.NewsletterDto,
    }),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "remove", null);
NewsletterController = __decorate([
    (0, common_1.Controller)("newsletter"),
    (0, swagger_1.ApiTags)("newsletter"),
    __metadata("design:paramtypes", [newsletter_service_1.NewsletterService])
], NewsletterController);
exports.NewsletterController = NewsletterController;
//# sourceMappingURL=newsletter.controller.js.map