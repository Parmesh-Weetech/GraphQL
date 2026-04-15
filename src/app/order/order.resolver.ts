import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Order } from './order.entity';
import { CreateOrderInput, FindOrdersByUserInput, UpdateOrderStatusInput } from './order.input';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';

@UseGuards(AuthGuard)
@Resolver(() => Order)
export class OrderResolver {
    constructor(private readonly orderService: OrderService) { }

    @Query(() => [Order])
    async listOrders() {
        return this.orderService.findAll();
    }

    @Query(() => Order, { nullable: true })
    async findOrderById(@Args('id', { type: () => ID }) id: string) {
        return this.orderService.findOne(id);
    }

    @Query(() => [Order])
    async findOrdersByUserId(
        @Args('input') input: FindOrdersByUserInput,
        @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== input.userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.orderService.findOrdersByUserId(currentUserId);
    }

    @Mutation(() => Order, { nullable: true })
    async createOrderFromCart(
        @Args('input') input: CreateOrderInput,
        @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== input.userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.orderService.createOrderFromCart(currentUserId);
    }

    @Mutation(() => Order, { nullable: true })
    async updateOrderStatus(
        @Args('input') input: UpdateOrderStatusInput,
    ) {
        return this.orderService.updateStatus(input.orderId, input.status);
    }
}
