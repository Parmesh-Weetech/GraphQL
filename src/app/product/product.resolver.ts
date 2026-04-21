import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductInput, UpdateProductInput } from './product.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/types/user-role.type';
import { DbProvider } from '../common/enums/db-provider.enum';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) { }

    @Query(() => [Product])
    async listProducts(
        @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider
    ) {
        return await this.productService.findAll(dbProvider);
    }

    @Query(() => Product, { nullable: true })
    async findProductById(
        @Args('id', { type: () => ID }) id: string,
        @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider
    ) {
        return await this.productService.findOne(id, dbProvider);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @Mutation(() => Product, { nullable: true })
    async createProduct(
        @Args('input') input: CreateProductInput,
        @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider
    ) {
        return await this.productService.create(input, dbProvider);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Mutation(() => Product, { nullable: true })
    async updateProduct(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateProductInput,
        @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider
    ) {
        return await this.productService.update(id, input, dbProvider);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Mutation(() => Boolean, { nullable: false })
    async deleteProduct(
        @Args('id', { type: () => ID }) id: string,
        @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider
    ) {
        return await this.productService.remove(id, dbProvider);
    }
}
