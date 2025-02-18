import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { RequestDocumentDto } from "./dto/requestDocument.dto";
import { RequestDocumentEntity } from "./entities/requestDocument.entity";
import { CreateRequestDocumentDto } from "./dto/create.requestDocument.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class RequestDocumentService extends AbstractService<RequestDocumentEntity> {
  constructor(
    @InjectRepository(RequestDocumentEntity)
    private RequestDocumentEntityRepository: Repository<RequestDocumentEntity>
  ) {
    super(RequestDocumentEntityRepository);
  }

  async save(createDocumentDto: CreateRequestDocumentDto) {
    const DocumentEntity =
      this.RequestDocumentEntityRepository.create(createDocumentDto);
    await this.RequestDocumentEntityRepository.save(DocumentEntity);
    return DocumentEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<RequestDocumentDto>> {
    const queryBuilder =
      this.RequestDocumentEntityRepository.createQueryBuilder(
        "requestDocuments"
      );
    queryBuilder.leftJoinAndSelect("requestDocuments.user", "user");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("requestDocuments.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("requestDocuments.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    return items.toPageDto(pageMetaDto);
  }

  async findAllByUserId(
    userId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<RequestDocumentDto>> {
    const queryBuilder =
      this.RequestDocumentEntityRepository.createQueryBuilder(
        "requestDocuments"
      );
    queryBuilder.leftJoinAndSelect("requestDocuments.user", "user");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("requestDocuments.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("requestDocuments.createdAt", pageOptionsDto.order);
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
