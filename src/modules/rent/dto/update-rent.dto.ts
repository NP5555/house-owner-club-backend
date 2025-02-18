import { BooleanFieldOptional, StringFieldOptional } from "../../../decorators";

export class UpdateRentDto {
  @StringFieldOptional()
  tokenId: string;

  @StringFieldOptional()
  rentAmount: string;

  @StringFieldOptional()
  securityAmount: string;

  @BooleanFieldOptional()
  isAcceptByTenant: boolean;

  @BooleanFieldOptional()
  requestForBack: boolean;

  @StringFieldOptional()
  lastPaymentTime: string;

  @StringFieldOptional()
  currentPaymentTime: string;

  @StringFieldOptional()
  acceptRentTime: string;

  @StringFieldOptional()
  duration: string;

  @StringFieldOptional()
  transactionHash: string;

  @StringFieldOptional()
  tag: string;

  @BooleanFieldOptional()
  isOnchain: boolean;

  @BooleanFieldOptional()
  isVacationRent: boolean;

  @StringFieldOptional()
  currencyId: string;

  @StringFieldOptional()
  tenantId: string;

  @StringFieldOptional()
  ownerId: string;

  @StringFieldOptional()
  projectId: string;

  @StringFieldOptional()
  agentLandId: string;
}
