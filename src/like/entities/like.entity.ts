import { Entity, ManyToOne } from 'typeorm';

import { CoursEntity } from '../../cours/entities/cours.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.likes })
export class LikeEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.likes)
  fromUser: UserEntity;

  @ManyToOne(() => CoursEntity)
  toCours: CoursEntity;
}
