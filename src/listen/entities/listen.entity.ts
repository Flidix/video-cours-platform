import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { VideoEntity } from 'src/video/entities/video.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.listens })
export class ListenEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.history)
  fromUser: UserEntity;

  @ManyToOne(() => VideoEntity)
  toVideo: VideoEntity;
}
