import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ICartRepository } from '../interfaces/cart-repository.interface';
import { CartDocument } from '../cart.schema';
import {
    CartItemDocument,
} from '../cart-item.schema';
import { AddToCartInput, UpdateCartItemInput } from '../cart.input';

@Injectable()
export class CartRepositoryMongo implements ICartRepository {
    constructor(
        @InjectModel(CartDocument.name)
        private readonly cartModel: Model<CartDocument>,
        @InjectModel(CartItemDocument.name)
        private readonly cartItemModel: Model<CartItemDocument>,
    ) { }

    async findCartByUserId(userId: string): Promise<any | null> {
        const cart = await this.cartModel
            .findOne({ user: new Types.ObjectId(userId) })
            .exec();
        if (!cart) return null;

        const cartItems = await this.cartItemModel
            .find({
                _id: { $in: cart.cartItems },
            })
            .exec();

        return {
            ...cart.toObject(),
            cartItems,
        };
    }

    async createCart(userId: string): Promise<any | null> {
        const existingCart = await this.findCartByUserId(userId);
        if (existingCart) return existingCart;

        const cart = new this.cartModel({
            user: new Types.ObjectId(userId),
            cartItems: [],
            totalAmount: 0,
        });
        return cart.save();
    }

    async addToCart(
        userId: string,
        input: AddToCartInput,
    ): Promise<CartDocument | null> {
        let cart = await this.findCartByUserId(userId);
        if (!cart) {
            cart = await this.createCart(userId);
            if (!cart) {
                throw new Error('Error while creating cart');
            }
        }

        const existingItem = await this.cartItemModel
            .findOne({
                _id: { $in: cart.cartItems },
                product: new Types.ObjectId(input.productId),
            })
            .exec();

        if (existingItem) {
            existingItem.quantity += Number(input.quantity);
            const price =
                (existingItem.total /
                    (existingItem.quantity - Number(input.quantity))) *
                existingItem.quantity;
            existingItem.total = price;
            await existingItem.save();
        } else {
            const cartItem = new this.cartItemModel({
                product: new Types.ObjectId(input.productId),
                quantity: Number(input.quantity),
                total: Number(input.quantity) * 0,
            });
            const savedItem = await cartItem.save();

            await this.cartModel.findByIdAndUpdate(cart.id, {
                $push: { cartItems: savedItem._id },
            });
        }

        return await this.updateCartTotal(cart.id.toString());
    }

    async updateCartItem(
        userId: string,
        input: UpdateCartItemInput,
    ): Promise<CartDocument | null> {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        const cartItem = await this.cartItemModel
            .findOne({
                _id: input.cartItemId,
                product: { $in: cart.cartItems },
            })
            .exec();

        if (cartItem) {
            cartItem.quantity = Number(input.quantity);
            await cartItem.save();
            return this.updateCartTotal(cart.id.toString());
        }
        return cart;
    }

    async removeFromCart(
        userId: string,
        cartItemId: string,
    ): Promise<CartDocument | null> {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        await this.cartItemModel.findByIdAndDelete(cartItemId).exec();

        await this.cartModel.findByIdAndUpdate(cart.id, {
            $pull: { cartItems: new Types.ObjectId(cartItemId) },
        });

        return this.updateCartTotal(cart.id.toString());
    }

    async clearCart(userId: string): Promise<CartDocument | null> {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        await this.cartItemModel
            .deleteMany({
                _id: { $in: cart.cartItems },
            })
            .exec();

        await this.cartModel.findByIdAndUpdate(cart.id, {
            cartItems: [],
            totalAmount: 0,
        });

        return this.findCartByUserId(userId);
    }

    async updateCartTotal(cartId: string): Promise<CartDocument | null> {
        const cart = await this.cartModel.findById(cartId).exec();
        if (!cart) return null;

        const cartItems = await this.cartItemModel
            .find({
                _id: { $in: cart.cartItems },
            })
            .exec();

        cart.totalAmount = cartItems.reduce(
            (total, item) => total + (item.total || 0),
            0,
        );
        await cart.save();

        return this.findCartByUserId(cart.user.toString());
    }
}
