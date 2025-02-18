import { IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(6)
  newPassword: string;
}
