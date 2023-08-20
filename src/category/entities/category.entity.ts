import { Column, Entity, OneToMany } from 'typeorm';

import { CoursToCategory } from './cours-to-category.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.categories })
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => CoursToCategory, (coursToCategory) => coursToCategory.category)
  coursToCategory: CoursToCategory[];
}
