import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ApiProperty } from "@nestjs/swagger";
import { CurrencyEntity } from '../entities/currency.entity';

export class CurrencyDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    isNative: boolean;

    @ApiProperty({nullable: true})
    tokenAddress?: string;

    constructor(entity: CurrencyEntity) {
        super(entity);
        this.name = entity.name;
        this.isNative = entity.isNative;
        this.tokenAddress = entity.tokenAddress;
    }
}
