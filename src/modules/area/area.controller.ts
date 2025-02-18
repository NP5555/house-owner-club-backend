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
  ValidationPipe
} from '@nestjs/common';
import { AreaService } from "./area.service";
import { Auth, UUIDParam } from "../../decorators";
// import { AbilitiesGuard } from "../../guards/abilities.guard";
// import { CheckPolicies } from "../ability/decorators/check-policies.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AreaDto } from "./dto/area.dto";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { PageDto } from "../../common/dto/page.dto";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { CreateAreaDto } from "./dto/create-area.dto";
// import { AreaManagePolicyHandler } from "./handlers/Area-manage-policy.handler";
import { UpdateAreaDto } from "./dto/update-area.dto";

@Controller('Area')
@ApiTags('Area')
export class AreaController {
  constructor(readonly service: AreaService) {
  }

  @Post()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registration of Area',
    type: CreateAreaDto,
  })
  async create(@Body() CreateAreaDto: CreateAreaDto) {
    const event = await this.service.save(CreateAreaDto);
    return event.toDto();
  }

  @Get()
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Areas',
    type: CreateAreaDto,
    isArray: true
  })
  findAll(@Query(new ValidationPipe({ transform: true }))
            pageOptionsDto: PageOptionsDto): Promise<PageDto<AreaDto>> {
    return this.service.findAllPageOptions(pageOptionsDto);
  }

  @Get(':id')
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Area by Id',
    type: AreaDto,
  })
  async findOne(@UUIDParam('id') id: Uuid) {
    const Area = await this.service.findOne({ id });
    if ( !Area ) {
      throw new NotFoundException();
    }
    return Area.toDto();
  }

  @Patch(':id')
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Area by Id',
    type: UpdateResult,
  })
  async update(@UUIDParam('id') id: Uuid, @Body() updateAreaDto: UpdateAreaDto) {
    const Area = await this.service.findOne({ id });
    if ( !Area ) {
      throw new NotFoundException();
    }
    return this.service.updateById(id, updateAreaDto);
  }

  @Delete(':id')
  // @Auth(AbilitiesGuard)
  // @CheckPolicies(AreaManagePolicyHandler)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete event',
    type: DeleteResult,
  })
  async remove(@UUIDParam('id') id: Uuid) {
    const Area = await this.service.findOne({ id });
    if ( !Area ) {
      throw new NotFoundException();
    }
    return this.service.delete(id);
  }

}
