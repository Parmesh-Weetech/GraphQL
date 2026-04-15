import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  providers: [OrderService, OrderResolver, AuthGuard],
  imports: [TypeOrmModule.forFeature([Order, OrderItem])]
})
export class OrderModule {}
