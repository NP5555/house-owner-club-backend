import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class UpdateStatusDTO {
  @IsString()
  @ApiProperty()
  id: string;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
