import { Column, Entity, ManyToOne } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { CoursEntity } from 'src/cours/entities/cours.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.coursToCategory })
export class CoursToCategory extends BaseEntity {
  @ManyToOne(() => CoursEntity, (cours) => cours.coursToCategory)
  cours: CoursEntity;

  @Column()
  coursId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.coursToCategory)
  category: CategoryEntity;

  @Column()
  categoryId: number;
}
