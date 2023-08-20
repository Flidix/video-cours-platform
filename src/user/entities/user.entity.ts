import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { SubscribeEntity } from "src/subscribe/entities/subscribe.entity";
import { CoursEntity } from "src/cours/entities/cours.entity";
import { LikeEntity } from "src/like/entities/like.entity";
import { ListenEntity } from "src/listen/entities/listen.entity";
import { BuedCoursesEntity } from "src/byed-courses/entities/bued-courses.entity";
import { OrderEntity } from "src/order/entities/order.entity";

@Entity({name: databaseTables.users})
export class UserEntity extends BaseEntity{
    @Column()
    email: string

    @Column()
    username: string

    @Column({ select: false })
    password: string

    @Column({ default: false })
    isAdmin: boolean

    @Column({ default: false })
    isOficial: boolean

    @Column({ default: 0 })
    subscribersCount: number

    @OneToMany(() => SubscribeEntity, (subscribe) => subscribe.fromUser)
    subscription: SubscribeEntity[]

    @OneToMany(() => SubscribeEntity, (subscribe) => subscribe.toUser)
    subscribers: SubscribeEntity[]

    @OneToMany(() => CoursEntity, (cours) => cours.user)
    courses: CoursEntity[]

    @OneToMany(() => LikeEntity, (like) => like.fromUser)
    likes: LikeEntity[]

    @OneToMany(() => ListenEntity, (listen) => listen.fromUser)
    history: ListenEntity[]

    @OneToMany(() => BuedCoursesEntity, (buedCourses) => buedCourses.fromUser)
    byedCourses: BuedCoursesEntity[]

    @OneToMany(() => OrderEntity, (oredr) => oredr.fromUser)
    orders: OrderEntity[]
}
