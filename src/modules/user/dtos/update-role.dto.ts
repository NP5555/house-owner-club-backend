import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { RoleType } from '../../../constants';

export class UpdateRoleDTO {
  @IsString()
  @ApiProperty()
  readonly id: string;

  @IsString()
  @ApiProperty()
  readonly role: RoleType;
}
