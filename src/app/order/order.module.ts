import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { Product } from '../product/product.entity';
import { OrderRepositoryPostgres } from './repositories/order-repository.postgres';
import { OrderRepositoryMongo } from './repositories/order-repository.mongo';
import { OrderDocument, OrderSchema } from './order.schema';
import { OrderItemDocument, OrderItemSchema } from './order-item.schema';

@Module({
  providers: [
    OrderService,
    OrderResolver,
    OrderRepositoryPostgres,
    OrderRepositoryMongo,
  ],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Cart, CartItem, Product]),
    MongooseModule.forFeature([
      { name: OrderDocument.name, schema: OrderSchema },
      { name: OrderItemDocument.name, schema: OrderItemSchema },
    ]),
  ],
  exports: [OrderService],
})
export class OrderModule {}
