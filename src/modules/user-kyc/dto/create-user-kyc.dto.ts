import { BooleanField, StringField, StringFieldOptional } from "../../../decorators";

export class CreateUserKYCDto {
  @StringField()
  firstName: string;

  @StringField()
  lastName: string;

  @StringField()
  email: string;

  @StringField()
  address: string;

  @StringField({ required: false })
  street: string;

  @StringField()
  state: string;

  @StringField()
  postalCode: string;

  @StringField()
  mobileNumber: string;

  @StringFieldOptional()
  company: string;

  @StringField()
  pubkey: string;

  @StringField({ required: false })
  certificates: string;

  @StringField()
  passportImage: string;

  @StringField()
  nicFrontImage: string;

  @StringField()
  nicBackImage: string;

  @StringField()
  signatureImage: string;

  @BooleanField()
  isPassport: boolean;

  @StringField()
  experience: string;

  @StringField()
  sourceOfIncome: string;

  @StringField()
  riskProfile: string;

  @StringField()
  userId?: string;
}
