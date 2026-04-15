import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ManyToOne, OneToMany, Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { User } from '../user/user.entity';
import { CartItem } from './cart-item.entity';

@ObjectType()
@Entity({ name: 'carts' })
export class Cart extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true,
  })
  cartItems: CartItem[];

  @Field(() => Float)
  @Column({ type: 'numeric', default: 0 })
  totalAmount: number;
}
