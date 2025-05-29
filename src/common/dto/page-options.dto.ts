import { Order } from '../../constants';
import {
  EnumFieldOptional,
  NumberFieldOptional,
} from '../../decorators';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PageOptionsDto {
  @EnumFieldOptional(() => Order, {
    default: Order.ASC,
  })
  readonly order: Order = Order.ASC;

  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Search query string',
    type: String,
  })
  readonly q?: string;
}
