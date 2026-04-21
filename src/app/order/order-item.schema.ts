import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { BaseSchema } from "../common/entity/base.schema";
import { Prop, Schema } from "@nestjs/mongoose";
import { ProductDocument } from "../product/product.schema";
import { Types } from "mongoose";
import { OrderDocument } from "./order.schema";

@ObjectType()
@Schema({ collection: 'order_items' })
export class OrderItemDocument extends BaseSchema {
    @Field(() => ProductDocument)
    @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
    product: Types.ObjectId;

    @Field(() => OrderDocument)
    @Prop({ required: true, type: Types.ObjectId, ref: 'Order' })
    order: Types.ObjectId;

    @Field(() => Int)
    @Prop({ type: 'int', default: 1 })
    quantity: number;

    @Field(() => Float)
    @Prop({ type: 'numeric', default: 0 })
    total: number;
}