import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { AddToCartInput, UpdateCartItemInput } from './cart.input';

@Resolver(() => Cart)
export class CartResolver {
    constructor(private readonly cartService: CartService) { }

    @Query(() => Cart, { nullable: true })
    async findCartByUserId(
        @Args('userId', { type: () => ID }) userId: string,
    ) {
        return this.cartService.findCartByUserId(userId);
    }

    @Mutation(() => Cart, { nullable: true })
    async addToCart(
        @Args('userId', { type: () => ID }) userId: string,
        @Args('input') input: AddToCartInput,
    ) {
        return this.cartService.addToCart(userId, input);
    }

    @Mutation(() => Cart, { nullable: true })
    async updateCartItem(
        @Args('userId', { type: () => ID }) userId: string,
        @Args('input') input: UpdateCartItemInput,
    ) {
        return this.cartService.updateCartItem(userId, input);
    }

    @Mutation(() => Cart, { nullable: true })
    async removeFromCart(
        @Args('userId', { type: () => ID }) userId: string,
        @Args('cartItemId', { type: () => ID }) cartItemId: string,
    ) {
        return this.cartService.removeFromCart(userId, cartItemId);
    }

    @Mutation(() => Cart, { nullable: true })
    async clearCart(@Args('userId', { type: () => ID }) userId: string) {
        return this.cartService.clearCart(userId);
    }
}
