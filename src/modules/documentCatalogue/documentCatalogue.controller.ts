import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Res,
  UploadedFile,
  Request,
} from "@nestjs/common";
import { DocumentCatalogueService } from "./documentCatalogue.service";
import { ApiFile, UUIDParam } from "../../decorators";
import { IFile } from "../../interfaces";

// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentCatalogueDto } from "./dto/documentCatalogue.dto";
import { PageDto } from "../../common/dto/page.dto";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateDocumentCatalogueDto } from "./dto/createDocumentCatalogue.dto";

@Controller("documentCatalogue")
@ApiTags("documentCatalogue")
export class DocumentCatalogueController {
  constructor(readonly service: DocumentCatalogueService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Add Documents Catalog",
    type: CreateDocumentCatalogueDto,
  })
  @ApiFile({ name: "document" })
  async create(
    @Body() createRequestDocumentDto: CreateDocumentCatalogueDto,
    @Request() req: any,
    @UploadedFile() file: IFile,
    @Res() res: any
  ) {
    const document = await this.service.save(
      req.body.userId,
      JSON.parse(req.body.isAdmin.toLowerCase()),
      file
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Documents added",
      data: document,
    });
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Document Catalog",
    type: CreateDocumentCatalogueDto,
    isArray: true,
  })
  async findAll(@Res() res: any): Promise<PageDto<DocumentCatalogueDto>> {
    const documents = await this.service.findAllPageOptions();
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records Found",
      data: documents,
    });
    return documents;
  }

  @Get("/userId")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get Document Catalog",
    type: CreateDocumentCatalogueDto,
    isArray: true,
  })
  async findByUserId(
    @Query("userId") userId: string,
    @Res() res: any
  ): Promise<PageDto<DocumentCatalogueDto>> {
    const documents = await this.service.findAllByUserId(userId);
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
    type: DocumentCatalogueDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const documents = await this.service.findOne({ id });
    if (!documents) {
      throw new NotFoundException();
    }
    return documents.toDto();
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete request document message",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid, @Res() res: any) {
    const Area = await this.service.findOne({ id });
    if (!Area) {
      throw new NotFoundException();
    }
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Document Deleted",
    });
  }
}
