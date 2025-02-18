import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { CategoryDto } from "./dto/category.dto";
import { CategoryEntity } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class CategoryService extends AbstractService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntityRepository: Repository<CategoryEntity>
  ) {
    super(categoryEntityRepository);
  }

  async save(createCategoryDto: CreateCategoryDto) {
    const categoryEntity =
      this.categoryEntityRepository.create(createCategoryDto);
    await this.categoryEntityRepository.save(categoryEntity);
    return categoryEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<CategoryDto>> {
    const queryBuilder =
      this.categoryEntityRepository.createQueryBuilder("category");
    if (!!pageOptionsDto.q) {
      queryBuilder.where("category.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("category.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }
}
