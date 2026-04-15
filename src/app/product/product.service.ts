import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput, UpdateProductInput } from './product.input';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async create(createProductReq: CreateProductInput): Promise<Product | null> {
        const product = await this.productRepository.save(
            this.productRepository.create({
                name: createProductReq.name,
                price: Number(createProductReq.price)
            })
        );

        return product ?? null;
    }

    async findOne(id: string): Promise<Product | null> {
        const product = await this.productRepository.findOne({ where: { id } });

        return product ?? null;
    }

    async findAll(): Promise<Product[] | []> {
        const products = await this.productRepository.find();

        return products.length > 0 ? products : [];
    }

    async update(id: string, updateProductReq: UpdateProductInput): Promise<Product | null> {
        const product = this.findOne(id);

        const affectedRows = await this.productRepository.update(
            id, {
                name: updateProductReq.name,
                price: Number(updateProductReq.price)
            }
        );

        if(affectedRows.affected === null || affectedRows.affected === undefined || affectedRows.affected === 0) {
            throw CustomExceptionFactory.create(
                ErrorCodes.INTERNAL_SERVER_ERROR
            );
        }

        return await this.findOne(id);
    }

    async remove(id: string) {
        const affectedRows = await this.productRepository.delete(id);

        if (affectedRows.affected === null || affectedRows.affected === undefined || affectedRows.affected === 0) {
            throw CustomExceptionFactory.create(
                ErrorCodes.INTERNAL_SERVER_ERROR
            );
        }

        return affectedRows.affected > 0;
    }
}
