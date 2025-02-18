import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrencyDto } from "./dto/currency.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Controller("Currency")
@ApiTags("Currency")
export class CurrencyController {
  constructor(readonly service: CurrencyService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CurrencyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of Currency",
    type: CreateCurrencyDto,
  })
  async create(@Body() CreateCurrencyDto: CreateCurrencyDto) {
    const event = await this.service.save(CreateCurrencyDto);
    return event.toDto();
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CurrencyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Currencies",
    type: CreateCurrencyDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<CurrencyDto>> {
    const data = await this.service.findAllPageOptions(pageOptionsDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: data,
    });
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CurrencyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Currency by Id",
    type: CurrencyDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const Currency = await this.service.findOne({ id });
    if (!Currency) {
      throw new NotFoundException();
    }
    return Currency.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CurrencyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update Currency by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateCurrencyDto: UpdateCurrencyDto
  ) {
    const Currency = await this.service.findOne({ id });
    if (!Currency) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateCurrencyDto);
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CurrencyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const Currency = await this.service.findOne({ id });
    if (!Currency) {
      throw new NotFoundException();
    }
    return this.service.delete(id);
  }
}
