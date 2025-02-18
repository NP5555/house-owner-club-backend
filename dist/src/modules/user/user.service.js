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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const mailer_1 = require("@nestjs-modules/mailer");
const exceptions_1 = require("../../exceptions");
const aws_s3_service_1 = require("../../shared/services/aws-s3.service");
const validator_service_1 = require("../../shared/services/validator.service");
const UserRegisterDto_1 = require("../auth/dto/UserRegisterDto");
const create_settings_command_1 = require("./commands/create-settings.command");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository, validatorService, awsS3Service, commandBus, mailerService) {
        this.userRepository = userRepository;
        this.validatorService = validatorService;
        this.awsS3Service = awsS3Service;
        this.commandBus = commandBus;
        this.mailerService = mailerService;
    }
    findOne(findData) {
        return this.userRepository.findOneBy(findData);
    }
    async findByUsernameOrEmail(options) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        if (options.email) {
            queryBuilder.orWhere("user.email = :email", {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere("user.username = :username", {
                username: options.username,
            });
        }
        return queryBuilder.getOne();
    }
    async createUser(userRegisterDto, file) {
        const user = this.userRepository.create(userRegisterDto);
        await this.userRepository.save(user);
        return user;
    }
    async createDeveloper(userRegisterDto) {
        const user = this.userRepository.create(userRegisterDto);
        await this.mailerService.sendMail({
            to: user.email,
            from: '"noreply" <hello@hoc.com>',
            subject: "Home Owners club",
            template: "../../../templates/registration.hbs",
            context: {
                email: user.email,
                password: user.password,
                role: user.role,
                pubkey: user.wallet,
            },
        });
        user.referralCode = this.generateReferralCode();
        if (userRegisterDto.code) {
            const queryBuilder = this.userRepository
                .createQueryBuilder("u")
                .where("u.referralCode = :code", { code: userRegisterDto.code });
            const referralUser = await queryBuilder.getOne();
            if (referralUser) {
                user.referredBy = referralUser.id;
            }
        }
        await this.userRepository.save(user);
        return user;
    }
    async getUsersReferredBy(pageOptionsDto, user) {
        const queryBuilder = this.userRepository
            .createQueryBuilder("user")
            .where("user.referredBy = :referredBy", { referredBy: user.id });
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        return items.toPageDto(pageMetaDto);
    }
    async getUsers(pageOptionsDto) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getDevelopers(pageOptionsDto) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        queryBuilder.where("user.role = :role", { role: "DEVELOPER" });
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAgents(pageOptionsDto) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        queryBuilder.where("user.role = :role", { role: "AGENT" });
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Failed to load data", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUser(userId) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        queryBuilder.where("user.id = :userId", { userId });
        const userEntity = await queryBuilder.getOne();
        if (!userEntity) {
            throw new exceptions_1.UserNotFoundException();
        }
        return userEntity.toDto();
    }
    async createSettings(userId, createSettingsDto) {
        return this.commandBus.execute(new create_settings_command_1.CreateSettingsCommand(userId, createSettingsDto));
    }
    async update(user) {
        await this.userRepository.save(user);
    }
    async updateRole(userId, role) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        queryBuilder.where("user.id = :userId", { userId });
        const user = await queryBuilder.getOne();
        if (!user) {
            throw new exceptions_1.UserNotFoundException();
        }
        user.role = role;
        await this.userRepository.save(user);
        return user.toDto();
    }
    async updateStatus(userId, isActive) {
        try {
            const queryBuilder = this.userRepository.createQueryBuilder("user");
            queryBuilder.where("user.id = :userId", { userId });
            const user = await queryBuilder.getOne();
            if (!user) {
                throw new exceptions_1.UserNotFoundException();
            }
            user.isActive = isActive;
            await this.userRepository.save(user);
            return user.toDto();
        }
        catch (error) {
            throw new common_1.HttpException("Failed", common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async updateOTP(userId, otp) {
        try {
            const queryBuilder = this.userRepository.createQueryBuilder("user");
            queryBuilder.where("user.id = :userId", { userId });
            const user = await queryBuilder.getOne();
            if (!user) {
                throw new exceptions_1.UserNotFoundException();
            }
            user.otp = otp;
            await this.userRepository.save(user);
            return user.toDto();
        }
        catch (error) {
            throw new common_1.HttpException("Failed", common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async findByEmail(email) {
        const queryBuilder = this.userRepository
            .createQueryBuilder("user");
        queryBuilder.where("user.email = :email", {
            email,
        });
        const user = await queryBuilder.getOne();
        if (!user) {
            throw new Error("Invalid email");
        }
        return user;
    }
    async updateKYC(userId) {
        const queryBuilder = this.userRepository.createQueryBuilder("user");
        queryBuilder.where("user.id = :userId", { userId });
        const user = await queryBuilder.getOne();
        if (!user) {
            throw new exceptions_1.UserNotFoundException();
        }
        user.isKYC = true;
        await this.userRepository.save(user);
        return user.toDto();
    }
    generateReferralCode() {
        return Math.random().toString(36).slice(2, 8);
    }
};
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "createUser", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        validator_service_1.ValidatorService,
        aws_s3_service_1.AwsS3Service,
        cqrs_1.CommandBus,
        mailer_1.MailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map