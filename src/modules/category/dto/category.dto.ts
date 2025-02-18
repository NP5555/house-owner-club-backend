import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from '../entities/category.entity';

export class CategoryDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    constructor(entity: CategoryEntity) {
        super(entity);
        this.name = entity.name;
        this.description = entity.description;
    }
}
