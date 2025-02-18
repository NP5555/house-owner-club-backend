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
import { RentService } from "./rent.service";
import { UUIDParam } from "../../decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RentDto } from "./dto/rent.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateRentDto } from "./dto/create-rent.dto";
import { UpdateRentDto } from "./dto/update-rent.dto";

@Controller("rent")
@ApiTags("rent")
export class RentController {
  constructor(readonly service: RentService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "List for rent",
    type: CreateRentDto,
  })
  async create(@Body() createTradeDto: CreateRentDto, @Res() res: any) {
    const tradeCreated = await this.service.save(createTradeDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record added",
    });
    return tradeCreated;
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get rent",
    type: CreateRentDto,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<RentDto> {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.findAllPageOptions(pageOptionsDto),
    });
  }

  @Get("/userId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get rent by user",
    type: CreateRentDto,
    isArray: true,
  })
  async findByUserId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("userId") userId: string,
    @Res() res: any
  ): Promise<PageDto<RentDto>> {
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get rent by buyer",
    type: CreateRentDto,
    isArray: true,
  })
  async findByBuyerId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("buyerId") buyerId: string,
    @Res() res: any
  ): Promise<PageDto<RentDto>> {
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

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get rent by Id",
    type: RentDto,
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
    @ApiResponse({
      status: HttpStatus.OK,
      description: "Update trade by Id",
      type: UpdateResult,
    })
    async update(
      @UUIDParam("id") id: Uuid,
      @Body() updateRentDto: UpdateRentDto,
      @Res() res: any
    ) {
      const trade = await this.service.findOne({ id });
      if (!trade) {
        throw new NotFoundException();
      }
      const data = await this.service.update(id, updateRentDto);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Record updated successfully",
        data: data
      });
    }

  @Delete(":id")
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
