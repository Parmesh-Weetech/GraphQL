import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { BaseEntity } from "../common/entity/base.entity";
import { OrderItem } from "./order-item.entity";
import { OrderStatus } from "./types/order-status.type";

@ObjectType()
@Entity({ name: "orders" })
export class Order extends BaseEntity {
    @Field(() => User)
    @ManyToOne(() => User)
    user: User;

    @Field(() => [OrderItem])
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        eager: true,
        cascade: true
    })
    orderItems: OrderItem[];

    @Field(() => Float)
    @Column({ type: 'numeric', default: 0 })
    totalAmount: number;

    @Field(() => OrderStatus)
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING, nullable: false })
    status: OrderStatus
}
