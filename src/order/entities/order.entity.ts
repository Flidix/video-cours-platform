import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { CoursEntity } from 'src/cours/entities/cours.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.orders })
export class OrderEntity extends BaseEntity {
  @Column({ default: 0 })
  price: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column()
  userId: number;

  @Column()
  courseId: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  fromUser: UserEntity;

  @ManyToOne(() => CoursEntity)
  toCours: CoursEntity;
}
