import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import { RoleType } from "../../../constants";
import type { UserEntity } from "../user.entity";
import { UserKYCEntity } from "../../user-kyc/entities/user-kyc.entity";

export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiProperty()
  username: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  wallet?: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  isKYC?: boolean;

  @ApiPropertyOptional()
  referralCode?: string;

  @ApiProperty({ type: () => UserKYCEntity })
  kyc: UserKYCEntity;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.wallet = user.wallet;
    this.referralCode = user.referralCode;
    this.isActive = user.isActive;
    this.isKYC = user.isKYC;
    this.kyc = user.userKYCS
  }
}
