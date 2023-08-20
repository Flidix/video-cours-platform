import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { VideoEntity } from "src/video/entities/video.entity";
import { CoursEntity } from "src/cours/entities/cours.entity";

@Entity({name: databaseTables.likes})
export class LikeEntity extends BaseEntity{

    @ManyToOne(() => UserEntity, (user) => user.likes)
    fromUser: UserEntity;

    @ManyToOne(() => CoursEntity)
    toCours: CoursEntity;
}
