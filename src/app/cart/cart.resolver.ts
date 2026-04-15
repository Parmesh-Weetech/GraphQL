import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { AddToCartInput, UpdateCartItemInput } from './cart.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';

@UseGuards(AuthGuard)
@Resolver(() => Cart)
export class CartResolver {
    constructor(private readonly cartService: CartService) { }

    @Query(() => Cart, { nullable: true })
    async findCartByUserId(
      @Args('userId', { type: () => ID }) userId: string,
      @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.cartService.findCartByUserId(currentUserId);
    }

    @Mutation(() => Cart, { nullable: true })
    async addToCart(
        @Args('userId', { type: () => ID }) userId: string,
        @Args('input') input: AddToCartInput,
        @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.cartService.addToCart(currentUserId, input);
    }

    @Mutation(() => Cart, { nullable: true })
    async updateCartItem(
        @Args('userId', { type: () => ID }) userId: string,
        @Args('input') input: UpdateCartItemInput,
        @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.cartService.updateCartItem(currentUserId, input);
    }

    @Mutation(() => Cart, { nullable: true })
    async removeFromCart(
        @Args('userId', { type: () => ID }) userId: string,
        @Args('cartItemId', { type: () => ID }) cartItemId: string,
        @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.cartService.removeFromCart(currentUserId, cartItemId);
    }

    @Mutation(() => Cart, { nullable: true })
    async clearCart(
        @Args('userId', { type: () => ID }) userId: string,
        @Context() context: any,
    ) {
        const currentUserId = context.req.user.userId;

        if (currentUserId !== userId) {
            throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
        }

        return this.cartService.clearCart(currentUserId);
    }
}
