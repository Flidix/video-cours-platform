import { Column, Entity, ManyToOne } from 'typeorm';

import { CoursEntity } from '../../cours/entities/cours.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.ratings })
export class RatingEntity extends BaseEntity {
  @Column()
  description: string;

  @Column()
  stars: number;

  @ManyToOne(() => UserEntity)
  fromUser: UserEntity;

  @ManyToOne(() => CoursEntity, (cours) => cours.ratings)
  toCours: CoursEntity;

  @Column()
  userId: number;

  @Column()
  courseId: number;
}
