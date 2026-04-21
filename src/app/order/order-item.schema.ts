import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../common/entity/base.schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ collection: 'order_items' })
export class OrderItemDocument extends BaseSchema {
  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Types.ObjectId;

  @Field(() => Int)
  @Prop({ type: 'number', default: 1 })
  quantity: number;

  @Field(() => Float)
  @Prop({ type: 'number', default: 0 })
  total: number;
}

import { Int, Float } from '@nestjs/graphql';

export const OrderItemSchema = SchemaFactory.createForClass(OrderItemDocument);
export type OrderItemDocumentType = HydratedDocument<OrderItemDocument>;
