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
import { RequestDocumentService } from "./requestDocument.service";
import { Auth, UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RequestDocumentDto } from "./dto/requestDocument.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateRequestDocumentDto } from "./dto/create.requestDocument.dto";
// import { AreaManagePolicyHandler } from "./handlers/Area-manage-policy.handler";
import { UpdateRequestDocumentDto } from "./dto/update-requestDocument.dto";

@Controller("requestDocuments")
@ApiTags("requestDocuments")
export class RequestDocumentController {
  constructor(readonly service: RequestDocumentService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Add request Documents",
    type: CreateRequestDocumentDto,
  })
  async create(@Body() CreateRequestDocumentDto: CreateRequestDocumentDto) {
    const event = await this.service.save(CreateRequestDocumentDto);
    return event.toDto();
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get request docs",
    type: CreateRequestDocumentDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("userId") userId: string,
    @Res() res: any
  ): Promise<PageDto<RequestDocumentDto>> {
    const documents = await this.service.findAllByUserId(
      userId,
      pageOptionsDto
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: documents,
    });
    return documents;
  }

  

  @Get(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get documents by Id",
    type: RequestDocumentDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const documents = await this.service.findOne({ id });
    if (!documents) {
      throw new NotFoundException();
    }
    return documents.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update request document by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateDocumentDto: UpdateRequestDocumentDto
  ) {
    const Area = await this.service.findOne({ id });
    if (!Area) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateDocumentDto);
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete request document message",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const Area = await this.service.findOne({ id });
    if (!Area) {
      throw new NotFoundException();
    }
    return this.service.delete(id);
  }
}
