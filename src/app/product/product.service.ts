import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateProductInput, UpdateProductInput } from './product.input';
import { IProductRepository } from './interfaces/product-repository.interface';
import { ProductRepositoryPostgres } from './repositories/product-repository.postgres';
import { ProductRepositoryMongo } from './repositories/product-repository.mongo';
import { DbProvider } from '../common/enums/db-provider.enum';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';

@Injectable()
export class ProductService {
    constructor(
        @Inject(forwardRef(() => ProductRepositoryPostgres))
        private readonly productRepositoryPostgres: ProductRepositoryPostgres,
        @Inject(forwardRef(() => ProductRepositoryMongo))
        private readonly productRepositoryMongo: ProductRepositoryMongo,
    ) { }

    private getRepository(dbProvider?: DbProvider): IProductRepository {
        const provider = dbProvider ?? DbProvider.POSTGRES;
        return provider === DbProvider.MONGODB
            ? this.productRepositoryMongo
            : this.productRepositoryPostgres;
    }

    async create(
        createProductReq: CreateProductInput,
        dbProvider?: DbProvider,
    ): Promise<any> {
        const product =
            await this.getRepository(dbProvider).create(createProductReq);
        return product ?? null;
    }

    async findOne(id: string, dbProvider?: DbProvider): Promise<any> {
        return this.getRepository(dbProvider).findOne(id);
    }

    async findAll(dbProvider?: DbProvider): Promise<any[]> {
        return this.getRepository(dbProvider).findAll();
    }

    async update(
        id: string,
        updateProductReq: UpdateProductInput,
        dbProvider?: DbProvider,
    ): Promise<any> {
        const product = await this.getRepository(dbProvider).findOne(id);

        if (!product) {
            throw CustomExceptionFactory.create(ErrorCodes.PRODUCT_NOT_FOUND);
        }

        return this.getRepository(dbProvider).update(id, updateProductReq);
    }

    async remove(id: string, dbProvider?: DbProvider): Promise<Boolean> {
        await this.findOne(id);

        const result = await this.getRepository(dbProvider).remove(id);

        if (!result) {
            throw CustomExceptionFactory.create(ErrorCodes.INTERNAL_SERVER_ERROR);
        }

        return result;
    }
}
