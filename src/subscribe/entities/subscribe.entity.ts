import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.subscribes })
export class SubscribeEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.subscription)
  fromUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscription)
  toUser: UserEntity;
}
