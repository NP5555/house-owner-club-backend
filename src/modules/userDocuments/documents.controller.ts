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
import { DocumentService } from "./documents.service";
import { UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentDto } from "./dto/documents.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateDocumentDto } from "./dto/create.documents.dto";
// import { AreaManagePolicyHandler } from "./handlers/Area-manage-policy.handler";
import { UpdateDocumentDto } from "./dto/update-documents.dto";

@Controller("userDocuments")
@ApiTags("userDocuments")
export class DocumentController {
  constructor(readonly service: DocumentService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Add user Documents",
    type: CreateDocumentDto,
  })
  async create(@Body() CreateDocumentDto: CreateDocumentDto) {
    const event = await this.service.save(CreateDocumentDto);
    return event.toDto();
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Documents",
    type: CreateDocumentDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Query("userId") userId: string, // Extract userId from query parameter
    @Res() res: any
  ): Promise<PageDto<DocumentDto>> {
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
    type: DocumentDto,
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
    description: "Update Area by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateDocumentDto: UpdateDocumentDto
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
    description: "Delete event",
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
