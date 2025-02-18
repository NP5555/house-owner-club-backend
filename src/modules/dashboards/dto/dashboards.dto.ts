import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../user/user.entity";

export class UserDashBoardDto {
  @ApiProperty()
  totalLands: number;

  @ApiProperty()
  requestedLands: number;

  @ApiProperty()
  boughtLands: number;

  @ApiProperty()
  listedLands: number;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
