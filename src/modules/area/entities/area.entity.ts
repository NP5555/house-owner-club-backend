import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstract.entity";
import { UseDto } from "../../../decorators";
import { AreaDto } from "../dto/area.dto";

@Entity({ name: "area" })
@UseDto(AreaDto)
export class AreaEntity extends AbstractEntity<AreaDto> {
  @Column()
  name: string;

  @Column()
  description: string;
}
