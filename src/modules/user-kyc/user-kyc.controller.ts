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
import { UserKYCService } from "./user-kyc.service";
import { UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserKYCDto } from "./dto/user-kyc.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateUserKYCDto } from "./dto/create-user-kyc.dto";
// import { UserKYCManagePolicyHandler } from "./handlers/UserKYC-manage-policy.handler";
import { UpdateUserKYCDto } from "./dto/update-user-kyc.dto";

@Controller("UserKYC")
@ApiTags("UserKYC")
export class UserKYCController {
  constructor(readonly service: UserKYCService) {}

  @Post()

  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of UserKYC",
    type: CreateUserKYCDto,
  })
  async create(@Body() createUserKYCDto: CreateUserKYCDto) {
    // console.log(user)
    // @AuthUser() user: UserEntity
    // createUserKYCDto.userId = '3051ed43-b004-411c-9f31-ed84f794b827';
    const event = await this.service.save(createUserKYCDto);
    return event.toDto();
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(UserKYCManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get UserKYCs",
    type: CreateUserKYCDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<UserKYCDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.findAllPageOptions(pageOptionsDto),
    });
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get("/byId")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Documents",
    type: CreateUserKYCDto,
    isArray: true,
  })
  async findAllByUserId(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("userId") userId: string, // Extract userId from query parameter
    @Res() res: any
  ): Promise<PageDto<UserKYCDto>> {
    const kycs = await this.service.findAllByUserKYCId(userId, pageOptionsDto);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: kycs,
    });
    return kycs;
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(UserKYCManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get UserKYC by Id",
    type: UserKYCDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const UserKYC = await this.service.findOne({ id });
    if (!UserKYC) {
      throw new NotFoundException();
    }
    return UserKYC.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(UserKYCManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update UserKYC by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateUserKYCDto: UpdateUserKYCDto
  ) {
    const UserKYC = await this.service.findOne({ id });
    if (!UserKYC) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateUserKYCDto);
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(UserKYCManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const UserKYC = await this.service.findOne({ id });
    if (!UserKYC) {
      throw new NotFoundException();
    }
    return this.service.delete(id);
  }
}
