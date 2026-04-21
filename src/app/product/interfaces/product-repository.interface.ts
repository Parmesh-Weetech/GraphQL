import { CreateProductInput, UpdateProductInput } from '../product.input';
import { ProductType } from '../types/product-repository.type';

export interface IProductRepository {
  findAll(): Promise<ProductType[] | []>;
  findOne(id: string): Promise<ProductType | null>;
  create(data: CreateProductInput): Promise<ProductType | null>;
  update(id: string, data: UpdateProductInput): Promise<ProductType | null>;
  remove(id: string): Promise<boolean>;
}
