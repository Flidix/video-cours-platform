import { Column, Entity, ManyToOne } from 'typeorm';

import { CoursEntity } from '../../cours/entities/cours.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import {databaseTables} from "@shared/database/constants";

@Entity({ name: databaseTables.buedCourses })
export class BuedCoursesEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.byedCourses)
  fromUser: UserEntity;

  @Column()
  userId: number;

  @Column()
  courseId: number;

  @ManyToOne(() => CoursEntity)
  cours: CoursEntity;
}
