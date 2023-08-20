import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { VideoEntity } from "src/video/entities/video.entity";
import { CoursToCategory } from "./cours-to-category.entity";

@Entity({name: databaseTables.categories})
export class CategoryEntity extends BaseEntity{

   @Column()
   name: string;

   @OneToMany(() => CoursToCategory, (coursToCategory) => coursToCategory.category)
   coursToCategory: CoursToCategory[]

}
