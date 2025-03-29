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
import { TradeService } from "./trade.service";
import { UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TradeDto } from "./dto/trade.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateTradeDto } from "./dto/create-trade.dto";
// import { BuyManagePolicyHandler } from "./handlers/Buy-manage-policy.handler";
import { UpdateTradeDto } from "./dto/update-trade.dto";

@Controller("trade")
@ApiTags("trade")
export class TradeController {
  constructor(readonly service: TradeService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of trade",
    type: CreateTradeDto,
  })
  async create(@Body() createTradeDto: CreateTradeDto, @Res() res: any) {
    const tradeCreated = await this.service.save(createTradeDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record added",
    });
    return tradeCreated;
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get trades",
    type: CreateTradeDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<TradeDto>> {
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
    description: "Get trades",
    type: CreateTradeDto,
    isArray: true,
  })
  async findByUserId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("userId") userId: string,
    @Res() res: any
  ): Promise<PageDto<TradeDto>> {
    const tradeLands = await this.service.findAllByUserId(
      userId,
      pageOptionsDto
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: tradeLands,
    });
    return tradeLands;
  }

  @Get("/buyerId")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get trades",
    type: CreateTradeDto,
    isArray: true,
  })
  async findByBuyerId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("buyerId") buyerId: string,
    @Res() res: any
  ): Promise<PageDto<TradeDto>> {
    const tradeLands = await this.service.findAllByBuyerId(
      buyerId,
      pageOptionsDto
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: tradeLands,
    });
    return tradeLands;
  }

  @Get("/nortary")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get trades",
    type: CreateTradeDto,
    isArray: true,
  })
  async findLandByUser(
    @Query("tokenId") tokenId: number,
    @Query("nftAddress") nftAddress: string,
    @Res() res: any
  ): Promise<TradeDto> {
    const tradeLands = await this.service.findLandByUser(
      tokenId,
      nftAddress,
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: tradeLands,
    });
    return tradeLands;
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get trade by Id",
    type: TradeDto,
  })
  async findOne(@UUIDParam("id") id: Uuid, @Res() res: any) {
    const trade = await this.service.findOneLand(id);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: trade,
    });
    return trade.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(BuyManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update trade by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateTradeDto: UpdateTradeDto,
    @Res() res: any
  ) {
    const data = await this.service.update(id, updateTradeDto)
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record updated successfully",
      data: data
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
    const trade = await this.service.findOne({ id });
    if (!trade) {
      throw new NotFoundException();
    }
    const deleteBuyLand = await this.service.delete(id);
    const allTrades = await this.service.findAll();
    return { deleteBuyLand, allTrades };
  }
}
