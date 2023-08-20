import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToMany, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";

@Entity({name: databaseTables.subscribes})
export class SubscribeEntity extends BaseEntity{
   @ManyToOne(() => UserEntity, (user) => user.subscription)
   fromUser: UserEntity;

   @ManyToOne(() => UserEntity, (user) => user.subscription)
   toUser: UserEntity;
}
