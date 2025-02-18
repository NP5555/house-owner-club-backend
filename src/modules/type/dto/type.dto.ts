import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { TypeEntity } from "../entities/type.entity";

export class TypeDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  blockchainId: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  projectId: string;

  constructor(entity: TypeEntity) {
    super(entity);
    this.name = entity.name;
    this.description = entity.description;
    this.blockchainId = entity.blockchainId;
    this.projectId = entity.projectId;
  }
}
