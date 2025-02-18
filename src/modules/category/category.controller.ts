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
import { CategoryService } from "./category.service";
import { Auth, UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryDto } from "./dto/category.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateCategoryDto } from "./dto/create-category.dto";
// import { CategoryManagePolicyHandler } from "./handlers/category-manage-policy.handler";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(readonly service: CategoryService) {}

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CategoryManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registration of category",
    type: CreateCategoryDto,
  })
  async create(@Body() CreateCategoryDto: CreateCategoryDto) {
    const event = await this.service.save(CreateCategoryDto);
    return event.toDto();
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CategoryManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get categorys",
    type: CreateCategoryDto,
    isArray: true,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<PageDto<CategoryDto>> {
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
  // @CheckPolicies(CategoryManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get category by Id",
    type: CategoryDto,
  })
  async findOne(@UUIDParam("id") id: Uuid) {
    const category = await this.service.findOne({ id });
    if (!category) {
      throw new NotFoundException();
    }
    return category.toDto();
  }

  @Patch(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CategoryManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update category by Id",
    type: UpdateResult,
  })
  async update(
    @UUIDParam("id") id: Uuid,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const category = await this.service.findOne({ id });
    if (!category) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateCategoryDto);
  }

  @Delete(":id")
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(CategoryManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete event",
    type: DeleteResult,
  })
  async remove(@UUIDParam("id") id: Uuid) {
    const category = await this.service.findOne({ id });
    if (!category) {
      throw new NotFoundException();
    }
    return this.service.delete(id);
  }
}
