import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IOrderRepository } from '../interfaces/order-repository.interface';
import { OrderDocument, OrderDocumentType } from '../order.schema';
import { OrderItemDocument } from '../order-item.schema';
import { OrderStatus } from '../types/order-status.type';

@Injectable()
export class OrderRepositoryMongo implements IOrderRepository {
  constructor(
    @InjectModel(OrderDocument.name)
    private readonly orderModel: Model<OrderDocumentType>,
    @InjectModel(OrderItemDocument.name)
    private readonly orderItemModel: Model<OrderItemDocument>,
  ) {}

  async findOrdersByUserId(userId: string): Promise<any[] | null> {
    const orders = await this.orderModel
      .find({ user: new Types.ObjectId(userId) })
      .exec();
    return orders;
  }

  async findOrderById(orderId: string): Promise<any | null> {
    return this.orderModel.findById(orderId).exec();
  }

  async createOrder(userId: string): Promise<any> {
    const order = new this.orderModel({
      user: new Types.ObjectId(userId),
      orderItems: [],
      totalAmount: 0,
      status: OrderStatus.PENDING,
    });
    return order.save();
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
  ): Promise<any | null> {
    return this.orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .exec();
  }

  async cancelOrder(orderId: string): Promise<any | null> {
    return this.orderModel
      .findByIdAndUpdate(
        orderId,
        { status: OrderStatus.CANCALLED },
        { new: true },
      )
      .exec();
  }
}
