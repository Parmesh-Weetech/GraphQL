import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from './order.entity';
import { CreateOrderInput, FindOrdersByUserInput, UpdateOrderStatusInput } from './order.input';
import { OrderService } from './order.service';

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
    async findOrdersByUserId(@Args('input') input: FindOrdersByUserInput) {
        const { userId } = input;
        return this.orderService.findOrdersByUserId(userId);
    }

    @Mutation(() => Order, { nullable: true })
    async createOrderFromCart(
        @Args('input') input: CreateOrderInput,
    ) {
        const { userId } = input;
        return this.orderService.createOrderFromCart(userId);
    }

    @Mutation(() => Order, { nullable: true })
    async updateOrderStatus(
        @Args('input') input: UpdateOrderStatusInput,
    ) {
        const { orderId, status } = input;
        return this.orderService.updateStatus(orderId, status);
    }
}
