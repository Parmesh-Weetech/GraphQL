import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from '../user/user.schema';
import { CartItemDocument } from './cart-item.schema';
import { BaseSchema } from '../common/entity/base.schema';

@ObjectType()
@Schema({ collection: 'carts' })
export class Cart extends BaseSchema {
    @Field(() => UserDocument)
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Field(() => [CartItemDocument])
    @Prop({ type: [{ type: Types.ObjectId, ref: 'CartItem' }], default: [] })
    cartItems: Types.ObjectId[];

    @Field(() => Float)
    @Prop({ type: Number, default: 0 })
    totalAmount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
export type CartDocument = HydratedDocument<Cart>;
