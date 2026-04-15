import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/product.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  providers: [CartService, CartResolver, AuthGuard],
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product])]
})
export class CartModule {}
