import { BooleanFieldOptional, StringFieldOptional } from "../../../decorators";

export class UpdateTradeDto {
  @StringFieldOptional()
  signatures: string;

  @StringFieldOptional()
  signatureTime: string;

  @StringFieldOptional()
  userId: string;

  @StringFieldOptional()
  buyerId: string;

  @StringFieldOptional()
  buyId: string;

  @StringFieldOptional()
  bidTime: string;

  @StringFieldOptional()
  price: string;

  @StringFieldOptional()
  transactionHash: string;

  @StringFieldOptional()
  tag: string;

  @StringFieldOptional()
  highestBidder: string;

  @BooleanFieldOptional()
  isSigned: boolean;

  @BooleanFieldOptional()
  isListed: boolean;

  @BooleanFieldOptional()
  isTradeInitiated: boolean;

  @BooleanFieldOptional()
  isSold: boolean;

  @BooleanFieldOptional()
  isAuction: boolean;

  @BooleanFieldOptional()
  isAllInstallmentPaid: boolean;
}
