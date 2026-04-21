import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IProductRepository } from "../interfaces/product-repository.interface";
import { ProductDocument } from '../product.schema'
import { Model } from "mongoose";
import { ProductType } from "../types/product-repository.type";
import { CreateProductInput, UpdateProductInput } from "../product.input";

@Injectable()
export class ProductRepositoryMongo implements IProductRepository {
    constructor(
        @InjectModel(ProductDocument.name)
        private readonly productModel: Model<ProductDocument>,
    ) { }

    async findAll(): Promise<ProductType[] | []> {
        const users = await this.productModel.find().exec();
        return users.length > 0 ? users : [];
    }

    async findOne(id: string): Promise<ProductType | null> {
        const user = await this.productModel.findById(id).exec();
        return user ?? null;
    }

    async create(data: CreateProductInput): Promise<ProductType | null> {
        const createProduct = new this.productModel({
            name: data.name,
            price: Number(data.price)
        });

        const savedProduct = await createProduct.save();

        return savedProduct ?? null;
    }

    async update(
        id: string,
        data: UpdateProductInput,
    ): Promise<ProductType | null> {
        const updatedProduct = await this.productModel
            .findByIdAndUpdate(
                id,
                {
                    name: data.name,
                    price: Number(data.price)
                },
                { new: true },
            )
            .exec();

        return updatedProduct ?? null;
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
