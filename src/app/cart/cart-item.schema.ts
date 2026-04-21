import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../common/entity/base.schema';

@Schema({ collection: 'cart_items' })
export class CartItemDocument extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ type: 'number', default: 1 })
  quantity: number;

  @Prop({ type: 'number', default: 0 })
  total: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItemDocument);
export type CartItemDocumentType = HydratedDocument<CartItemDocument>;
