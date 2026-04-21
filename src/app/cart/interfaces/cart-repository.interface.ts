import { AddToCartInput, UpdateCartItemInput } from "../cart.input";
import { CartType } from "../types/cart-repository.type";

export interface ICartRepository {
    findCartByUserId(userId: string): Promise<CartType | null>;
    createCart(userId: string): Promise<CartType | null>;
    addToCart(userId: string, input: AddToCartInput): Promise<CartType | null>;
    updateCartItem(userId: string, input: UpdateCartItemInput): Promise<CartType | null>;
    removeFromCart(userId: string, cartItemId: string): Promise<CartType | null>;
    clearCart(userId: string): Promise<CartType | null>;
    updateCartTotal(cartId: string): Promise<CartType | null>;
}