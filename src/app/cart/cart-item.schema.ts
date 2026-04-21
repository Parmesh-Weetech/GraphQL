import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'cart_items', timestamps: true })
export class CartItemDocument {
  @Prop({ type: 'string' })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ type: 'number', default: 1 })
  quantity: number;

  @Prop({ type: 'number', default: 0 })
  total: number;

  @Prop({ type: 'date' })
  createdAt: Date;

  @Prop({ type: 'date' })
  updatedAt: Date;

  @Prop({ type: 'date' })
  deletedAt: Date;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItemDocument);
export type CartItemDocumentType = HydratedDocument<CartItemDocument>;
