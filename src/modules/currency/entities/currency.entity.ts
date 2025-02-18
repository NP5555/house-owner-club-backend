import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { CurrencyDto } from "../dto/currency.dto";
import { ProjectEntity } from "../../project/entities/project.entity";
import { RentEntity } from "../../rent/entities/rent.entity";

@Entity({ name: "currency" })
@UseDto(CurrencyDto)
export class CurrencyEntity extends AbstractEntity<CurrencyDto> {
  @Column()
  name: string;

  @Column()
  isNative: boolean;

  @Column({ nullable: true })
  tokenAddress?: string;

  @OneToMany(() => ProjectEntity, (projectEn) => projectEn.currency)
  projects: ProjectEntity[];

  @OneToMany(() => RentEntity, (rentEn) => rentEn.currency)
  rent: RentEntity[];
}
