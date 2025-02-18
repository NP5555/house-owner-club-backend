import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { UUIDParam, Auth } from "../../decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransactionDto } from "./dto/transaction.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { RoleType } from "../../constants";

@Controller("Transaction")
@ApiTags("Transaction")
export class TransactionController {
  constructor(readonly service: TransactionService) {}

  @Post()
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of Transaction",
    type: CreateTransactionDto,
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: any
  ) {
    const transactionSaved = await this.service.save(createTransactionDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record added",
    });
    return transactionSaved;
  }

  @Get()
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Transactions",
    type: CreateTransactionDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<TransactionDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.getAllTransactions(pageOptionsDto),
    });
    return this.service.getAllTransactions(pageOptionsDto);
  }

  @Get(":id")
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Transaction by Id",
    type: TransactionDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const Type = await this.service.findOne({ id });
    if (!Type) {
        throw new HttpException("Record Not Found", HttpStatus.NOT_FOUND);
    }
    return Type.toDto();
  }
}
