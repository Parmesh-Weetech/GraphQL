import { InjectRepository } from '@nestjs/typeorm';
import { ICartRepository } from '../interfaces/cart-repository.interface';
import { Cart } from '../cart.entity';
import { Repository } from 'typeorm';
import { CartType } from '../types/cart-repository.type';
import { User } from 'src/app/user/user.entity';
import { AddToCartInput, UpdateCartItemInput } from '../cart.input';
import { CartItem } from '../cart-item.entity';
import { Product } from 'src/app/product/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepositoryPostgres implements ICartRepository {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findCartByUserId(userId: string): Promise<any | null> {
        return await this.cartRepository.findOne({
            where: { user: { id: userId } },
            relations: ['cartItems', 'cartItems.product'],
        });
    }

    async createCart(userId: string): Promise<any | null> {
        const cart = this.cartRepository.create({
            user: { id: userId } as unknown as User,
        });
        return this.cartRepository.save(cart);
    }

    async addToCart(userId: string, input: AddToCartInput): Promise<any | null> {
        let cart = await this.findCartByUserId(userId);
        if (!cart) {
            cart = await this.createCart(userId);

            if (!cart) {
                throw new Error('Error while creating cart');
            }
        }

        const product = await this.productRepository.findOne({
            where: { id: input.productId },
        });
        if (!product) {
            return cart;
        }

        const existingItem = await this.cartItemRepository.findOne({
            where: {
                cart: { id: cart.id as string },
                product: { id: input.productId },
            },
        });

        if (existingItem) {
            existingItem.quantity += Number(input.quantity);
            existingItem.total = existingItem.quantity * product.price;
            await this.cartItemRepository.save(existingItem);
        } else {
            const cartItem = this.cartItemRepository.create({
                cart: { id: cart.id as string } as unknown as Cart,
                product,
                quantity: Number(input.quantity),
                total: Number(input.quantity) * product.price,
            });
            await this.cartItemRepository.save(cartItem);
        }

        return await this.updateCartTotal(cart.id as string);
    }

    async updateCartItem(
        userId: string,
        input: UpdateCartItemInput,
    ): Promise<any | null> {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        const cartItem = await this.cartItemRepository.findOne({
            where: { id: input.cartItemId, cart: { id: cart.id as string } },
            relations: ['product'],
        });

        if (cartItem) {
            cartItem.quantity = Number(input.quantity);
            cartItem.total = cartItem.quantity * cartItem.product.price;
            await this.cartItemRepository.save(cartItem);
            return this.updateCartTotal(cart.id as string);
        }
        return cart ?? null;
    }

    async removeFromCart(
        userId: string,
        cartItemId: string,
    ): Promise<any | null> {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        await this.cartItemRepository.delete(cartItemId);
        return this.updateCartTotal(cart.id as string);
    }

    async clearCart(userId: string): Promise<any | null> {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        await this.cartItemRepository.delete({ cart: { id: cart.id as string } });
        cart.totalAmount = 0;
        return this.cartRepository.save(cart);
    }

    async updateCartTotal(cartId: string): Promise<any | null> {
        const cart = await this.cartRepository.findOne({
            where: { id: cartId },
            relations: ['cartItems', 'cartItems.product'],
        });

        if (cart) {
            cart.totalAmount = cart.cartItems.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0,
            );
            return this.cartRepository.save(cart);
        }
        return cart;
    }
}
