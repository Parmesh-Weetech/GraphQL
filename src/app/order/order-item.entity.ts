import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../common/entity/base.entity";
import { Product } from "../product/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Order } from "./order.entity";

@ObjectType()
@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity {
    @Field(() => Product)
    @ManyToOne(() => Product, { eager: true })
    product: Product;

    @Field(() => Order)
    @ManyToOne(() => Order, (order) => order.orderItems, {
        onDelete: 'CASCADE'
    })
    order: Order;

    @Field(() => Int)
    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Field(() => Float)
    @Column({ type: 'numeric', default: 0 })
    total: number;
}
