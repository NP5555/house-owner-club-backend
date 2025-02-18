import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { CurrencyDto } from "./dto/currency.dto";
import { CurrencyEntity } from "./entities/currency.entity";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { AbstractService } from "../../common/abstract.service";

@Injectable()
export class CurrencyService extends AbstractService<CurrencyEntity> {
  constructor(
    @InjectRepository(CurrencyEntity)
    private CurrencyEntityRepository: Repository<CurrencyEntity>
  ) {
    super(CurrencyEntityRepository);
  }

  async save(createCurrencyDto: CreateCurrencyDto) {
    const CurrencyEntity =
      this.CurrencyEntityRepository.create(createCurrencyDto);
    await this.CurrencyEntityRepository.save(CurrencyEntity);
    return CurrencyEntity;
  }

  async findAllPageOptions(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<CurrencyDto>> {
    const queryBuilder =
      this.CurrencyEntityRepository.createQueryBuilder("Currency");
    if (!!pageOptionsDto.q) {
      queryBuilder.where("Currency.name like :search", {
        search: `%${pageOptionsDto.q}%`,
      });
    }
    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("Currency.createdAt", pageOptionsDto.order);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Failed to load data", HttpStatus.NOT_FOUND);
    }
  }
}
