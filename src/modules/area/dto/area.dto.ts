import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ApiProperty } from "@nestjs/swagger";
import { AreaEntity } from '../entities/area.entity';

export class AreaDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    constructor(entity: AreaEntity) {
        super(entity);
        this.name = entity.name;
        this.description = entity.description;
    }
}
