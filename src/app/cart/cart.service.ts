import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ICartRepository } from './interfaces/cart-repository.interface';
import { CartRepositoryPostgres } from './repositories/cart-repository.postgres';
import { CartRepositoryMongo } from './repositories/cart-repository.mongo';
import { AddToCartInput, UpdateCartItemInput } from './cart.input';
import { DbProvider } from '../common/enums/db-provider.enum';
import { CartType } from './types/cart-repository.type';

@Injectable()
export class CartService {
  constructor(
    @Inject(forwardRef(() => CartRepositoryPostgres))
    private readonly cartRepositoryPostgres: CartRepositoryPostgres,
    @Inject(forwardRef(() => CartRepositoryMongo))
    private readonly cartRepositoryMongo: CartRepositoryMongo,
  ) { }

  private getRepository(dbProvider?: DbProvider): ICartRepository {
    const provider = dbProvider ?? DbProvider.POSTGRES;
    return provider === DbProvider.MONGODB
      ? this.cartRepositoryMongo
      : this.cartRepositoryPostgres;
  }

  async findCartByUserId(
    userId: string,
    dbProvider?: DbProvider,
  ): Promise<CartType | null> {
    return this.getRepository(dbProvider).findCartByUserId(userId);
  }

  async createCart(
    userId: string,
    dbProvider?: DbProvider,
  ): Promise<CartType | null> {
    return this.getRepository(dbProvider).createCart(userId);
  }

  async addToCart(
    userId: string,
    input: AddToCartInput,
    dbProvider?: DbProvider,
  ): Promise<CartType | null> {
    return this.getRepository(dbProvider).addToCart(userId, input);
  }

  async updateCartItem(
    userId: string,
    input: UpdateCartItemInput,
    dbProvider?: DbProvider,
  ): Promise<CartType | null> {
    return this.getRepository(dbProvider).updateCartItem(userId, input);
  }

  async removeFromCart(
    userId: string,
    cartItemId: string,
    dbProvider?: DbProvider,
  ): Promise<CartType | null> {
    return this.getRepository(dbProvider).removeFromCart(userId, cartItemId);
  }

  async clearCart(
    userId: string,
    dbProvider?: DbProvider,
  ): Promise<CartType | null> {
    return this.getRepository(dbProvider).clearCart(userId);
  }
}
