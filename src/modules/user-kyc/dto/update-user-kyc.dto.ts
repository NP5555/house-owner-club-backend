import { StringFieldOptional, BooleanFieldOptional } from "../../../decorators";

export class UpdateUserKYCDto {
  @StringFieldOptional()
  firstName: string;

  @StringFieldOptional()
  lastName: string;

  @StringFieldOptional()
  email: string;

  @StringFieldOptional()
  address: string;

  @StringFieldOptional()
  street: string;

  @StringFieldOptional()
  state: string;

  @StringFieldOptional()
  postalCode: string;

  @StringFieldOptional()
  mobileNumber: string;

  @StringFieldOptional()
  company: string;

  @StringFieldOptional()
  pubkey: string;

  @StringFieldOptional()
  certificates: string;

  @StringFieldOptional()
  passportImage: string;

  @StringFieldOptional()
  nicFrontImage: string;

  @StringFieldOptional()
  nicBackImage: string;

  @StringFieldOptional()
  signatureImage: string;

  @StringFieldOptional({ enum: ["pending", "approved", "rejected"] })
  status: "pending" | "approved" | "rejected";

  @BooleanFieldOptional()
  isPassport: boolean;

  @StringFieldOptional()
  experience: string;

  @StringFieldOptional()
  sourceOfIncome: string;

  @StringFieldOptional()
  riskProfile: string;
}
