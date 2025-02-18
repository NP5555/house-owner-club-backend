import {
  StringField,
  StringFieldOptional,
  BooleanField,
  BooleanFieldOptional,
} from "../../../decorators";

export class CreateRentDto {
  @StringField()
  tokenId: string;

  @StringField()
  rentAmount: string;

  @StringField()
  securityAmount: string;

  @BooleanFieldOptional({ default: false })
  isAcceptByTenant: boolean;

  @BooleanFieldOptional({ default: false })
  requestForBack: boolean;

  @StringField()
  lastPaymentTime: string;

  @StringField()
  duration: string;

  @BooleanField()
  isVacationRent: boolean;

  @StringField()
  currencyId: string;

  @StringFieldOptional()
  tenantId: string;

  @StringField()
  ownerId: string;

  @StringField()
  projectId: string;

  @StringField()
  agentLandId: string;

  @BooleanFieldOptional({ default: false })
  isOnchain: boolean;
}
