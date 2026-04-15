import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Module({
  providers: [ProductService, ProductResolver, AuthGuard, RoleGuard],
  imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductModule { }
