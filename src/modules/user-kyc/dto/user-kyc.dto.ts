import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ApiProperty } from "@nestjs/swagger";
import { UserKYCEntity } from "../entities/user-kyc.entity";
import { UserEntity } from "../../user/user.entity";

export class UserKYCDto extends AbstractDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  pubkey: string;

  @ApiProperty()
  certificates: string;

  @ApiProperty()
  passportImage: string;

  @ApiProperty()
  nicFrontImage: string;

  @ApiProperty()
  nicBackImage: string;

  @ApiProperty()
  signatureImage: string;

  @ApiProperty()
  isPassport: boolean;

  @ApiProperty()
  experience: string;

  @ApiProperty()
  sourceOfIncome: string;

  @ApiProperty()
  riskProfile: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: ["pending", "approved", "rejected"] })
  status: "pending" | "approved" | "rejected";

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  constructor(entity: UserKYCEntity) {
    super(entity);
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.address = entity.address;
    this.street = entity.street;
    this.state = entity.state;
    this.postalCode = entity.postalCode;
    this.mobileNumber = entity.mobileNumber;
    this.company = entity.company;
    this.pubkey = entity.pubkey;
    this.certificates = entity.certificates;
    this.passportImage = entity.passportImage;
    this.nicFrontImage = entity.nicFrontImage;
    this.nicBackImage = entity.nicBackImage;
    this.signatureImage = entity.signatureImage;
    this.isPassport = entity.isPassport;
    this.experience = entity.experience;
    this.sourceOfIncome = entity.sourceOfIncome;
    this.riskProfile = entity.riskProfile;
    this.userId = entity.userId;
    this.user = entity.user;
    this.status = entity.status;
  }
}
