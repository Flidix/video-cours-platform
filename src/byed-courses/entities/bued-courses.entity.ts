import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { CoursEntity } from "src/cours/entities/cours.entity";

@Entity({name: databaseTables.buedCourses})
export class BuedCoursesEntity extends BaseEntity{

   @ManyToOne(() => UserEntity, (user) => user.byedCourses)
   fromUser: UserEntity

   @Column()
   userId: number

   @Column()
   courseId: number

   @ManyToOne(() => CoursEntity)
   cours: CoursEntity

}
