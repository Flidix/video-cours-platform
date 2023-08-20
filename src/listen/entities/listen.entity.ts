import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { VideoEntity } from "src/video/entities/video.entity";

@Entity({name: databaseTables.listens})
export class ListenEntity extends BaseEntity{

   @ManyToOne(() => UserEntity, (user) => user.history)
   fromUser: UserEntity

   @ManyToOne(() => VideoEntity)
   toVideo: VideoEntity

}
