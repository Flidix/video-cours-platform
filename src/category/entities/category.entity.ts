import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, OneToMany} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { CoursToCategory } from "./cours-to-category.entity";

@Entity({name: databaseTables.categories})
export class CategoryEntity extends BaseEntity{

   @Column()
   name: string;

   @OneToMany(() => CoursToCategory, (coursToCategory) => coursToCategory.category)
   coursToCategory: CoursToCategory[]

}
