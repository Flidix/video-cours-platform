   import {BaseEntity} from "@shared/database/entities/base.entity";
   import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
   import {databaseTables} from "@shared/database/constants";
   import { UserEntity } from "src/user/entities/user.entity";
   import { RatingEntity } from "src/rating/entities/rating.entity";
   import { VideoEntity } from "src/video/entities/video.entity";
   import { CoursToCategory } from "src/category/entities/cours-to-category.entity";

   @Entity({name: databaseTables.courses})
   export class CoursEntity extends BaseEntity{

      @Column()
      name: string

      @Column()
      avatar: string

      @Column({default: 0})
      price: number

      @Column()
      description: string

      @Column({default: 0})
      likesCount: number

      @Column({default: false})
      isOficial: boolean

      @Column({default: 0})
      stars: number

      @Column()
      userId: number

      @ManyToOne(() => UserEntity, (user) => user.courses)
      user: UserEntity

      @OneToMany(() => RatingEntity, (cours) => cours.toCours)
      ratings: RatingEntity[]

      @OneToMany(() => VideoEntity, (video) => video.toCours)
      videos: VideoEntity[]

      @OneToMany(() => CoursToCategory, (coursToCategory) => coursToCategory.cours)
      coursToCategory: CoursToCategory[]
   }
