import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepositoryMongo } from './repositories/product-repository.mongo';
import { ProductRepositoryPostgres } from './repositories/product-repository.postgres';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDocument, ProductSchema } from './product.schema'

@Module({
  providers: [
    ProductService,
    ProductResolver,
    ProductRepositoryMongo,
    ProductRepositoryPostgres
  ],
  imports: [
    TypeOrmModule.forFeature([Product]),
    MongooseModule.forFeature([{
      name: ProductDocument.name,
      schema: ProductSchema
    }])
  ]
})
export class ProductModule { }
