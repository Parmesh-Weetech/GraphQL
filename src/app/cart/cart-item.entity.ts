import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ManyToOne, Column, Entity } from 'typeorm';
import { Product } from '../product/product.entity';
import { Cart } from './cart.entity';
import { BaseEntity } from '../common/entity/base.entity';

@ObjectType()
@Entity({ name: 'cart_items' })
export class CartItem extends BaseEntity {
  @Field(() => Product)
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
  cart: Cart;

  @Field(() => Int)
  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Field(() => Float)
  @Column({ type: 'numeric', default: 0 })
  total: number;
}
