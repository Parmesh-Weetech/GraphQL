import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';
import { OrderItem } from '../order-item.entity';
import { IOrderRepository } from '../interfaces/order-repository.interface';
import { OrderType } from '../types/order-repository.type';
import { Product } from '../../product/product.entity';
import { User } from '../../user/user.entity';
import { OrderStatus } from '../types/order-status.type';

@Injectable()
export class OrderRepositoryPostgres implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOrdersByUserId(userId: string): Promise<OrderType[] | null> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  async findOrderById(orderId: string): Promise<OrderType | null> {
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  async createOrder(userId: string): Promise<OrderType> {
    const order = this.orderRepository.create({
      user: { id: userId } as unknown as User,
      status: OrderStatus.PENDING,
      totalAmount: 0,
    });
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
  ): Promise<OrderType | null> {
    await this.orderRepository.update(orderId, {
      status: status as OrderStatus,
    });
    return this.findOrderById(orderId);
  }

  async cancelOrder(orderId: string): Promise<OrderType | null> {
    await this.orderRepository.update(orderId, {
      status: OrderStatus.CANCALLED,
    });
    return this.findOrderById(orderId);
  }
}
