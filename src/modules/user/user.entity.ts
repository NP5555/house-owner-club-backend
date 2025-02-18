import { Column, Entity, OneToMany, OneToOne } from "typeorm";

import type { IAbstractEntity } from "../../common/abstract.entity";
import { AbstractEntity } from "../../common/abstract.entity";
import { RoleType } from "../../constants";
import { UseDto, VirtualColumn } from "../../decorators";
import type { UserDtoOptions } from "./dtos/user.dto";
import { UserDto } from "./dtos/user.dto";
import type { IUserSettingsEntity } from "./user-settings.entity";
import { UserSettingsEntity } from "./user-settings.entity";
import { UserKYCEntity } from "../user-kyc/entities/user-kyc.entity";
import { AgentLandEntity } from "../agent-land/entities/agent-land.entity";
import { DocumentEntity } from "../userDocuments/entities/documents.entity";
import { DocumentCatalogueEntity } from "../documentCatalogue/entities/documentCatalogue.entity";
import { BuyEntity } from "../buy/entities/buy.entity";
import { TradeEntity } from "../trade/entities/trade.entity";
import { RentEntity } from "../rent/entities/rent.entity";
import { ProjectEntity } from "../project/entities/project.entity";
export interface IUserEntity extends IAbstractEntity<UserDto> {
  firstName?: string;

  lastName?: string;

  role: RoleType;

  email?: string;

  password?: string;

  phone?: string;

  avatar?: string;

  fullName?: string;

  wallet?: string;

  settings?: IUserSettingsEntity;
}

@Entity({ name: "users" })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions>
  implements IUserEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @VirtualColumn()
  fullName?: string;

  @Column({ default: false })
  isKYC?: boolean;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ nullable: true })
  wallet?: string;

  @Column({ nullable: true })
  referralCode: string;

  @Column({ nullable: true })
  referredBy: Uuid;

  @Column({ nullable: true })
  otp?: number;

  @OneToMany(() => AgentLandEntity, (aEn) => aEn.user)
  agentLands: AgentLandEntity[];

  @OneToMany(() => DocumentCatalogueEntity, (dc) => dc.user)
  documentCatalogue: DocumentCatalogueEntity[];

  @OneToMany(() => ProjectEntity, (aEn) => aEn.developer)
  project: ProjectEntity[];

  @OneToMany(() => DocumentEntity, (aEn) => aEn.user)
  documents: DocumentEntity[];

  @OneToMany(() => BuyEntity, (aEn) => aEn.user)
  buys: BuyEntity[];

  @OneToMany(() => TradeEntity, (aEn) => aEn.user)
  trade: TradeEntity[];

  @OneToMany(
    () => RentEntity,
    (aEn) => {
      aEn.tenant, aEn.owner;
    }
  )
  rent: RentEntity[];

  @OneToOne(() => UserKYCEntity, (userKYC) => userKYC.user)
  userKYCS: UserKYCEntity;
}
