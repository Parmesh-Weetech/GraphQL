import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { OrderStatus } from './types/order-status.type';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseSchema } from '../common/entity/base.schema';
import { UserDocument } from '../user/user.schema';
import { OrderItemDocument } from './order-item.schema';

@ObjectType()
@Schema({ collection: 'orders', timestamps: true })
export class OrderDocument extends BaseSchema {
  @Field(() => UserDocument)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Field(() => [OrderItemDocument])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }], default: [] })
  orderItems: Types.ObjectId[];

  @Field(() => Float)
  @Prop({ type: 'number', default: 0 })
  totalAmount: number;

  @Field()
  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
export type OrderDocumentType = HydratedDocument<OrderDocument>;
