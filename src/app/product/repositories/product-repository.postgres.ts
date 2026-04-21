import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { CreateProductInput, UpdateProductInput } from '../product.input';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { ProductType } from '../types/product-repository.type';

@Injectable()
export class ProductRepositoryPostgres implements IProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<ProductType[] | []> {
        const products = await this.productRepository.find();
        return products.length > 0 ? products : [];
    }

    async findOne(id: string): Promise<ProductType | null> {
        return this.productRepository.findOne({ where: { id } });
    }

    

    async create(data: CreateProductInput): Promise<ProductType | null> {
        const product = await this.productRepository.save(
            this.productRepository.create({
                name: data.name,
                price: Number(data.price),
            }),
        );
        return product ?? null;
    }

    async update(
        id: string,
        data: UpdateProductInput,
    ): Promise<ProductType | null> {
        await this.productRepository.update(id, {
            name: data.name,
            price: Number(data.price),
        });
        return this.findOne(id);
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.productRepository.delete(id);
        return (
            result.affected !== null &&
            result.affected !== undefined &&
            result.affected > 0
        );
    }
}
