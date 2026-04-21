import { Order } from '../order.entity';
import { CreateOrderInput, UpdateOrderStatusInput } from '../order.input';
import { OrderType } from '../types/order-repository.type';

export interface IOrderRepository {
  findOrdersByUserId(userId: string): Promise<OrderType[] | null>;
  findOrderById(orderId: string): Promise<OrderType | null>;
  createOrder(userId: string): Promise<OrderType>;
  updateOrderStatus(orderId: string, status: string): Promise<OrderType | null>;
  cancelOrder(orderId: string): Promise<OrderType | null>;
}
