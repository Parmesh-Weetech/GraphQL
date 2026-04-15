import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ManyToOne, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Product } from '../product/product.entity';
import { Cart } from './cart.entity';

@ObjectType()
@Entity({ name: 'cart_items' })
export class CartItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Product)
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
  cart: Cart;

  @Field()
  @Column({ default: 1 })
  quantity: number;
}
