import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { CoursEntity } from "src/cours/entities/cours.entity";

@Entity({name: databaseTables.ratings})
export class RatingEntity extends BaseEntity{

   @Column()
   description: string

   @Column()
   stars: number

   @ManyToOne(() => UserEntity)
   fromUser: UserEntity;

   @ManyToOne(() => CoursEntity, (cours) => cours.ratings)
   toCours: CoursEntity;

   @Column()
   userId: number

   @Column()
   courseId: number

}
