import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema } from "../common/entity/base.schema";
import { Field, Float, ObjectType } from "@nestjs/graphql";
import { UserDocument } from "../user/user.schema";
import { Types } from "mongoose";
import { OrderItemDocument } from "./order-item.schema";
import { OrderStatus } from "./types/order-status.type";

@ObjectType()
@Schema({ collection: 'orders' })
export class OrderDocument extends BaseSchema {
    @Field(() => UserDocument)
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId;

    @Field(() => [OrderItemDocument])
    @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }], default: [] })
    orderItems: Types.ObjectId[];

    @Field(() => Float)
    @Prop({ type: 'numeric', default: 0 })
    totalAmount: number;

    @Field(() => OrderStatus)
    @Prop({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING, required: false })
    status: OrderStatus;
}