import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import type { FindOptionsWhere } from "typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { MailerService } from "@nestjs-modules/mailer";

import type { PageDto } from "../../common/dto/page.dto";
import { RoleType } from "../../constants";
import { FileNotImageException, UserNotFoundException } from "../../exceptions";
import { IFile } from "../../interfaces";
import { AwsS3Service } from "../../shared/services/aws-s3.service";
import { ValidatorService } from "../../shared/services/validator.service";
import { UserRegisterDto } from "../auth/dto/UserRegisterDto";
import { CreateSettingsCommand } from "./commands/create-settings.command";
import { CreateSettingsDto } from "./dtos/create-settings.dto";
import type { UserDto } from "./dtos/user.dto";
import type { UsersPageOptionsDto } from "./dtos/users-page-options.dto";
import { UserEntity } from "./user.entity";
import type { UserSettingsEntity } from "./user-settings.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus,
    private mailerService: MailerService
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>
  ): Promise<UserEntity | null> {
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

  @Transactional()
  async createUser(
    userRegisterDto: UserRegisterDto,
    file?: IFile
  ): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    // await this.mailerService.sendMail({
    //   to: user.email,
    //   from: '"noreply" <hello@hoc.com>',
    //   subject: "Home Owners club",
    //   template: "../../../templates/registration.hbs",
    //   context: {
    //     email: user.email,
    //     password: user.password,
    //     role: user.role,
    //     pubkey: user.wallet,
    //   },
    // });

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();
    // }

    // if (file) {
    //   user.avatar = await this.awsS3Service.uploadImage(file);
    // }

    // user.referralCode = this.generateReferralCode();

    // if (userRegisterDto.code) {
    //   const queryBuilder = this.userRepository
    //     .createQueryBuilder("u")
    //     .where("u.referralCode = :code", { code: userRegisterDto.code });

    //   const referralUser = await queryBuilder.getOne();

    //   if (referralUser) {
    //     user.referredBy = referralUser.id;
    //   }
    // }

    await this.userRepository.save(user);

    return user;
  }

  async createDeveloper(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
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

  async getUsersReferredBy(
    pageOptionsDto: UsersPageOptionsDto,
    user: UserEntity
  ): Promise<PageDto<UserDto>> {
    // const queryBuilder = this.userRepository.createQueryBuilder('user');
    const queryBuilder = this.userRepository
      .createQueryBuilder("user")
      .where("user.referredBy = :referredBy", { referredBy: user.id });

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async getDevelopers(
    pageOptionsDto: UsersPageOptionsDto
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.where("user.role = :role", { role: "DEVELOPER" });
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async getAgents(
    pageOptionsDto: UsersPageOptionsDto
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.where("user.role = :role", { role: "AGENT" });
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async getUser(userId: Uuid): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    queryBuilder.where("user.id = :userId", { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }

  async createSettings(
    userId: Uuid,
    createSettingsDto: CreateSettingsDto
  ): Promise<UserSettingsEntity> {
    return this.commandBus.execute<CreateSettingsCommand, UserSettingsEntity>(
      new CreateSettingsCommand(userId, createSettingsDto)
    );
  }

  async update(user: UserEntity) {
    await this.userRepository.save(user);
  }

  async updateRole(userId: string, role: RoleType): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    queryBuilder.where("user.id = :userId", { userId });

    const user = await queryBuilder.getOne();

    if (!user) {
      throw new UserNotFoundException();
    }

    user.role = role;
    await this.userRepository.save(user);

    return user.toDto();
  }

  async updateStatus(userId: string, isActive: boolean): Promise<UserDto> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder("user");

      queryBuilder.where("user.id = :userId", { userId });

      const user = await queryBuilder.getOne();

      if (!user) {
        throw new UserNotFoundException();
      }

      user.isActive = isActive;
      await this.userRepository.save(user);

      return user.toDto();
    } catch (error) {
      throw new HttpException("Failed", HttpStatus.BAD_GATEWAY);
    }
  }

  async updateOTP(userId: string, otp: number): Promise<UserDto> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder("user");

      queryBuilder.where("user.id = :userId", { userId });

      const user = await queryBuilder.getOne();

      if (!user) {
        throw new UserNotFoundException();
      }

      user.otp = otp;
      await this.userRepository.save(user);

      return user.toDto();
    } catch (error) {
      throw new HttpException("Failed", HttpStatus.BAD_GATEWAY);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const queryBuilder = this.userRepository
      .createQueryBuilder("user")

    queryBuilder.where("user.email = :email", {
      email,
    });

    const user = await queryBuilder.getOne();

    if (!user) {
      throw new Error("Invalid email");
    }

    return user;
  }

  async updateKYC(userId: Uuid): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    queryBuilder.where("user.id = :userId", { userId });

    const user = await queryBuilder.getOne();

    if (!user) {
      throw new UserNotFoundException();
    }

    user.isKYC = true;
    await this.userRepository.save(user);

    return user.toDto();
  }

  generateReferralCode(): string {
    // Generate a random alphanumeric code
    // Check if the code already exists in the database and regenerate if needed
    // ...
    return Math.random().toString(36).slice(2, 8);
  }
}
