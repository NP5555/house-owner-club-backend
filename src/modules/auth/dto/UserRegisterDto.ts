import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";
import { Column } from "typeorm";

import { Trim } from "../../../decorators/transform.decorators";
import { RoleType } from "../../../constants";

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @Column()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @Column()
  @IsOptional()
  wallet: string;

  @ApiProperty()
  @Column()
  @IsOptional()
  code: string;

  @ApiProperty()
  @Column()
  @IsOptional()
  role: RoleType;
}
