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
import { BuyService } from "./buy.service";
import { UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BuyDto } from "./dto/buy.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateBuyDto } from "./dto/create-buy.dto";
// import { BuyManagePolicyHandler } from "./handlers/Buy-manage-policy.handler";
import { UpdateBuyDto } from "./dto/update-buy.dto";

@Controller("buy")
@ApiTags("buy")
export class BuyController {
  constructor(readonly service: BuyService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of buy",
    type: CreateBuyDto,
  })
  async create(@Body() createBuyDto: CreateBuyDto, @Res() res: any) {
    const buyCreated = await this.service.save(createBuyDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record added",
    });
    return buyCreated;
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get buys",
    type: CreateBuyDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<BuyDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.findAllPageOptions(pageOptionsDto),
    });
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get("/userId")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get buys",
    type: CreateBuyDto,
    isArray: true,
  })
  async findByUserId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("userId") userId: string,
    @Res() res: any
  ): Promise<PageDto<BuyDto>> {
    const buyLands = await this.service.findAllByUserId(userId, pageOptionsDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: buyLands,
    });
    return buyLands;
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get buy by Id",
    type: BuyDto,
  })
  async findOne(@UUIDParam("id") id: Uuid, @Res() res: any) {
    const buy = await this.service.findOneLand(id);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: buy,
    });
    return buy.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update buy by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateBuyDto: UpdateBuyDto,
    @Res() res: any
  ) {
    const buy = await this.service.findOne({ id });
    if (!buy) {
      throw new NotFoundException();
    }
    // await this.service.updateById(id, updateBuyDto);
    await this.service.updateById(id, updateBuyDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record updated successfully",
      data: await this.service.updateById(id, updateBuyDto),
    });
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const buy = await this.service.findOne({ id });
    if (!buy) {
      throw new NotFoundException();
    }
    const deleteBuyLand = await this.service.delete(id);
    const allBuys = await this.service.findAll();
    return { deleteBuyLand, allBuys };
  }
}
