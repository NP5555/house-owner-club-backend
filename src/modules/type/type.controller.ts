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
import { TypeService } from "./type.service";
import {  UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TypeDto } from "./dto/type.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateTypeDto } from "./dto/create-type.dto";
// import { TypeManagePolicyHandler } from "./handlers/Type-manage-policy.handler";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Controller("Type")
@ApiTags("Type")
export class TypeController {
  constructor(readonly service: TypeService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(TypeManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of Type",
    type: CreateTypeDto,
  })
  async create(@Body() createTypeDto: CreateTypeDto) {
    const createType = await this.service.save(createTypeDto);
    const allTypes = await this.service.findAll();
    return { createType, allTypes };
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(TypeManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Types",
    type: CreateTypeDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<TypeDto>> {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Record Found",
      data: await this.service.findAllPageOptions(pageOptionsDto),
    });
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(TypeManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Type by Id",
    type: TypeDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const Type = await this.service.findOne({ id });
    if (!Type) {
      throw new NotFoundException();
    }
    return Type.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(TypeManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update Type by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateTypeDto: UpdateTypeDto
  ) {
    const Type = await this.service.findOne({ id });
    if (!Type) {
      throw new NotFoundException();
    }
    const patchType = await this.service.updateById(id, updateTypeDto);
    const allTypes = await this.service.findAll();
    return { patchType, allTypes };
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(TypeManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const Type = await this.service.findOne({ id });
    if (!Type) {
      throw new NotFoundException();
    }
    const deleteType = await this.service.delete(id);
    const allTypes = await this.service.findAll();
    return { deleteType, allTypes };
  }
}
