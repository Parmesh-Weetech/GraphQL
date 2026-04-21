import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/product.entity';
import { CartRepositoryPostgres } from './repositories/cart-repository.postgres';
import { CartRepositoryMongo } from './repositories/cart-repository.mongo';
import { CartDocument, CartSchema } from './cart.schema';
import { CartItemDocument, CartItemSchema } from './cart-item.schema';

@Module({
  providers: [
    CartService,
    CartResolver,
    CartRepositoryPostgres,
    CartRepositoryMongo,
  ],
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product]),
    MongooseModule.forFeature([
      { name: CartDocument.name, schema: CartSchema },
      { name: CartItemDocument.name, schema: CartItemSchema },
    ]),
  ],
  exports: [CartService],
})
export class CartModule { }
