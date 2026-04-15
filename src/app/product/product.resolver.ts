import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductInput, UpdateProductInput } from './product.input';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) { }

    @Query(() => [Product])
    async listProducts() {
        return await this.productService.findAll();
    }

    @Query(() => Product, { nullable: true })
    async findProductById(@Args('id', { type: () => ID }) id: string) {
        return await this.productService.findOne(id);
    }

    @Mutation(() => Product, { nullable: true })
    async createProduct(@Args('input') input: CreateProductInput) {
        return await this.productService.create(input);
    }

    @Mutation(() => Product, { nullable: true })
    async updateProduct(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateProductInput
    ) {
        return await this.productService.update(id, input);
    }

    @Mutation(() => Boolean, { nullable: false })
    async deleteProduct(@Args('id', { type: () => ID }) id: string) {
        return await this.productService.remove(id);
    }
}
