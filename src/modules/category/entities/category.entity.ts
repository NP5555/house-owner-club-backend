import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { CategoryDto } from "../dto/category.dto";
import { ProjectEntity } from "../../project/entities/project.entity";


@Entity({ name: 'categories' })
@UseDto(CategoryDto)
export class CategoryEntity extends AbstractEntity<CategoryDto> {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ProjectEntity, (projectEn) => projectEn.category)
  projects: ProjectEntity[];
}
