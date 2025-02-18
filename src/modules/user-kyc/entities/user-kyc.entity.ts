import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { UserKYCDto } from "../dto/user-kyc.dto";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "user_kyc" })
@UseDto(UserKYCDto)
export class UserKYCEntity extends AbstractEntity<UserKYCDto> {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  postalCode: string;

  @Column({ nullable: false })
  mobileNumber: string;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: true })
  pubkey: string;

  @Column({ nullable: false })
  certificates: string;

  @Column({ nullable: true })
  passportImage: string;

  @Column({ nullable: true })
  nicFrontImage: string;

  @Column({ nullable: true })
  nicBackImage: string;

  @Column({ nullable: false })
  signatureImage: string;

  @Column({ nullable: false })
  isPassport: boolean;

  @Column({ nullable: false })
  experience: string;

  @Column({ nullable: false })
  sourceOfIncome: string;

  @Column({ nullable: false })
  riskProfile: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column({ nullable: true, default: "pending" })
  status: "pending" | "approved" | "rejected";

  @OneToOne(() => UserEntity, (user) => user.userKYCS, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
