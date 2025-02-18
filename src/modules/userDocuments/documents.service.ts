import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { DocumentDto } from "./dto/documents.dto";
import { DocumentEntity } from "./entities/documents.entity";
import { CreateDocumentDto } from "./dto/create.documents.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class DocumentService extends AbstractService<DocumentEntity> {
  constructor(
    @InjectRepository(DocumentEntity)
    private DocumentEntityRepository: Repository<DocumentEntity>
  ) {
    super(DocumentEntityRepository);
  }

  async save(createDocumentDto: CreateDocumentDto) {
    const DocumentEntity =
      this.DocumentEntityRepository.create(createDocumentDto);
    await this.DocumentEntityRepository.save(DocumentEntity);
    return DocumentEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<DocumentDto>> {
    const queryBuilder =
      this.DocumentEntityRepository.createQueryBuilder("documents");
    queryBuilder.leftJoinAndSelect("documents.user", "user");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("documents.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("documents.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }

  async findAllByUserId(
    userId: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<DocumentDto>> {
    const queryBuilder =
      this.DocumentEntityRepository.createQueryBuilder("documents");
    queryBuilder.leftJoinAndSelect("documents.user", "user");

    if (!!pageOptionsDto.q) {
      queryBuilder.where("documents.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("documents.createdAt", pageOptionsDto.order);
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
