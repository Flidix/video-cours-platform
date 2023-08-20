import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { VideoEntity } from "src/video/entities/video.entity";
import { CoursEntity } from "src/cours/entities/cours.entity";
import { CategoryEntity } from "./category.entity";

@Entity({name: databaseTables.coursToCategory})
export class CoursToCategory extends BaseEntity{

   @ManyToOne(() => CoursEntity, (cours) => cours.coursToCategory)
   cours: CoursEntity;

   @Column()
   coursId: number;

   @ManyToOne(() => CategoryEntity, (category) => category.coursToCategory)
   category: CategoryEntity;

   @Column()
   categoryId: number;
}
