import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './types/order-status.type';
import { IOrderRepository } from './interfaces/order-repository.interface';
import { OrderRepositoryPostgres } from './repositories/order-repository.postgres';
import { OrderRepositoryMongo } from './repositories/order-repository.mongo';
import { DbProvider } from '../common/enums/db-provider.enum';

@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => OrderRepositoryPostgres))
    private readonly orderRepositoryPostgres: OrderRepositoryPostgres,
    @Inject(forwardRef(() => OrderRepositoryMongo))
    private readonly orderRepositoryMongo: OrderRepositoryMongo,
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  private getRepository(dbProvider?: DbProvider): IOrderRepository {
    const provider = dbProvider ?? DbProvider.POSTGRES;
    return provider === DbProvider.MONGODB
      ? this.orderRepositoryMongo
      : this.orderRepositoryPostgres;
  }

  async findAll(dbProvider?: DbProvider): Promise<any> {
    return this.getRepository(dbProvider).findOrdersByUserId('');
  }

  async findOne(id: string, dbProvider?: DbProvider): Promise<any> {
    return this.getRepository(dbProvider).findOrderById(id);
  }

  async findOrdersByUserId(
    userId: string,
    dbProvider?: DbProvider,
  ): Promise<any> {
    return this.getRepository(dbProvider).findOrdersByUserId(userId);
  }

  async createOrderFromCart(
    userId: string,
    dbProvider?: DbProvider,
  ): Promise<any> {
    if (dbProvider === DbProvider.MONGODB) {
      throw CustomExceptionFactory.create(ErrorCodes.INTERNAL_SERVER_ERROR);
    }

    return this.dataSource.transaction(async (manager) => {
      const cartRepository = manager.getRepository(Cart);
      const cartItemRepository = manager.getRepository(CartItem);
      const orderRepository = manager.getRepository(Order);
      const orderItemRepository = manager.getRepository(OrderItem);

      const cart = await cartRepository.findOne({
        where: { user: { id: userId } },
        relations: ['cartItems', 'cartItems.product', 'user'],
      });

      if (!cart) {
        throw CustomExceptionFactory.create(ErrorCodes.CART_EMPTY);
      }

      if (!cart.cartItems || cart.cartItems.length === 0) {
        throw CustomExceptionFactory.create(ErrorCodes.ORDER_ITEMS_EMPTY);
      }

      const order = await orderRepository.save(
        orderRepository.create({
          user: cart.user,
          totalAmount: cart.totalAmount,
          status: OrderStatus.PENDING,
        }),
      );

      const orderItems = cart.cartItems.map((cartItem) =>
        orderItemRepository.create({
          order,
          product: cartItem.product,
          quantity: cartItem.quantity,
          total: cartItem.total,
        }),
      );

      await orderItemRepository.save(orderItems);

      await cartItemRepository.delete({ cart: { id: cart.id } });
      await cartRepository.delete(cart.id);

      return orderRepository.findOne({
        where: { id: order.id },
        relations: ['orderItems', 'orderItems.product', 'user'],
      });
    });
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    dbProvider?: DbProvider,
  ): Promise<any> {
    if (!Object.values(OrderStatus).includes(status)) {
      throw CustomExceptionFactory.create(ErrorCodes.ORDER_STATUS_INVALID);
    }

    return this.getRepository(dbProvider).updateOrderStatus(id, status);
  }

  async cancelOrder(id: string, dbProvider?: DbProvider): Promise<any> {
    return this.getRepository(dbProvider).cancelOrder(id);
  }
}
