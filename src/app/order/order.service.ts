import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './types/order-status.type';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async findAll(): Promise<Order[] | []> {
    const orders = await this.orderRepository.find({
      relations: ['orderItems', 'orderItems.product', 'user'],
      order: { createdAt: 'DESC' },
    });

    return orders.length > 0 ? orders : [];
  }

  async findOne(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product', 'user'],
    });

    return order ?? null;
  }

  async findOrdersByUserId(userId: string): Promise<Order[] | []> {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems', 'orderItems.product'],
      order: { createdAt: 'DESC' },
    });

    return orders.length > 0 ? orders : [];
  }

  async createOrderFromCart(userId: string): Promise<Order | null> {
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

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    if (!Object.values(OrderStatus).includes(status)) {
      throw CustomExceptionFactory.create(ErrorCodes.ORDER_STATUS_INVALID);
    }

    const order = await this.findOne(id);
    if (!order) {
      throw CustomExceptionFactory.create(ErrorCodes.ORDER_NOT_FOUND);
    }

    order.status = status;
    await this.orderRepository.save(order);

    return this.findOne(id);
  }
}
