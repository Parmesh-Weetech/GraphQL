import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { AddToCartInput, UpdateCartItemInput } from './cart.input';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findCartByUserId(userId: string): Promise<Cart | null> {
    return this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  async createCart(userId: string): Promise<Cart> {
    const cart = this.cartRepository.create({
      user: { id: userId } as unknown as User,
    });
    return this.cartRepository.save(cart);
  }

  async addToCart(userId: string, input: AddToCartInput): Promise<Cart> {
    let cart = await this.findCartByUserId(userId);
    if (!cart) {
      cart = await this.createCart(userId);
    }

    const existingItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: input.productId } },
    });

    if (existingItem) {
      existingItem.quantity += input.quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      const cartItem = this.cartItemRepository.create({
        cart: { id: cart.id } as unknown as Cart,
        product: { id: input.productId } as unknown as Product,
        quantity: input.quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.updateCartTotal(cart.id);
  }

  async updateCartItem(
    userId: string,
    input: UpdateCartItemInput,
  ): Promise<Cart | null> {
    const cart = await this.findCartByUserId(userId);
    if (!cart) return null;

    const cartItem = await this.cartItemRepository.findOne({
      where: { id: input.cartItemId, cart: { id: cart.id } },
    });

    if (cartItem) {
      cartItem.quantity = input.quantity;
      await this.cartItemRepository.save(cartItem);
      return this.updateCartTotal(cart.id);
    }
    return cart ?? null;
  }

  async removeFromCart(
    userId: string,
    cartItemId: string,
  ): Promise<Cart | null> {
    const cart = await this.findCartByUserId(userId);
    if (!cart) return null;

    await this.cartItemRepository.delete(cartItemId);
    return this.updateCartTotal(cart.id);
  }

  async clearCart(userId: string): Promise<Cart | null> {
    const cart = await this.findCartByUserId(userId);
    if (!cart) return null;

    await this.cartItemRepository.delete({ cart: { id: cart.id } });
    cart.totalAmount = 0;
    return this.cartRepository.save(cart);
  }

  private async updateCartTotal(cartId: string): Promise<Cart | null> {
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
