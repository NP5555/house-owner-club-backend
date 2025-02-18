import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UserKYCDto } from "./dto/user-kyc.dto";
import { UserKYCEntity } from "./entities/user-kyc.entity";
import { CreateUserKYCDto } from "./dto/create-user-kyc.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class UserKYCService extends AbstractService<UserKYCEntity> {
  constructor(
    @InjectRepository(UserKYCEntity)
    private UserKYCEntityRepository: Repository<UserKYCEntity>
  ) {
    super(UserKYCEntityRepository);
  }

  async save(createUserKYCDto: CreateUserKYCDto) {
    const UserKYCEntity = this.UserKYCEntityRepository.create(createUserKYCDto);
    await this.UserKYCEntityRepository.save(UserKYCEntity);
    return UserKYCEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserKYCDto>> {
    const queryBuilder =
      this.UserKYCEntityRepository.createQueryBuilder("UserKYC");
    queryBuilder.leftJoinAndSelect("UserKYC.user", "user");
    if (!!pageOptionsDto.q) {
      queryBuilder.where("UserKYC.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("UserKYC.createdAt", pageOptionsDto.order);
    }

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findAllByUserKYCId(
    userId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserKYCEntity>> {
    const queryBuilder =
      this.UserKYCEntityRepository.createQueryBuilder("UserKYC");
    queryBuilder.leftJoinAndSelect("UserKYC.user", "user");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("UserKYC.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("UserKYC.createdAt", pageOptionsDto.order);
    }
    // Add a condition to filter by userId
    queryBuilder.andWhere("user.id = :userId", { userId });

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }
}
