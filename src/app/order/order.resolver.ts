import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Order } from './order.entity';
import {
  CreateOrderInput,
  FindOrdersByUserInput,
  UpdateOrderStatusInput,
} from './order.input';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';
import { DbProvider } from '../common/enums/db-provider.enum';

@UseGuards(AuthGuard)
@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async listOrders(
    @Args('dbProvider', { nullable: true }) dbProvider: DbProvider,
  ) {
    return this.orderService.findAll(dbProvider);
  }

  @Query(() => Order, { nullable: true })
  async findOrderById(
    @Args('id', { type: () => ID }) id: string,
    @Args('dbProvider', { nullable: true }) dbProvider: DbProvider,
  ) {
    return this.orderService.findOne(id, dbProvider);
  }

  @Query(() => [Order])
  async findOrdersByUserId(
    @Args('input') input: FindOrdersByUserInput,
    @Args('dbProvider', { nullable: true }) dbProvider: DbProvider,
    @Context() context: any,
  ) {
    const currentUserId = context.req.user.userId;

    if (currentUserId !== input.userId) {
      throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
    }

    return this.orderService.findOrdersByUserId(currentUserId, dbProvider);
  }

  @Mutation(() => Order, { nullable: true })
  async createOrderFromCart(
    @Args('input') input: CreateOrderInput,
    @Args('dbProvider', { nullable: true }) dbProvider: DbProvider,
    @Context() context: any,
  ) {
    const currentUserId = context.req.user.userId;

    if (currentUserId !== input.userId) {
      throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
    }

    return this.orderService.createOrderFromCart(currentUserId, dbProvider);
  }

  @Mutation(() => Order, { nullable: true })
  async updateOrderStatus(
    @Args('input') input: UpdateOrderStatusInput,
    @Args('dbProvider', { nullable: true }) dbProvider: DbProvider,
  ) {
    return this.orderService.updateStatus(
      input.orderId,
      input.status,
      dbProvider,
    );
  }
}
