import { Module } from '@nestjs/common';
import * as path from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './app/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './app/config/pg.config';
import { User } from './app/user/user.entity';
import { ProductModule } from './app/product/product.module';
import { Product } from './app/product/product.entity';
import { Cart } from './app/cart/cart.entity';
import { CartItem } from './app/cart/cart-item.entity';
import { CartModule } from './app/cart/cart.module';
import { OrderModule } from './app/order/order.module';
import { Order } from './app/order/order.entity';
import { OrderItem } from './app/order/order-item.entity';
import { AuthModule } from './app/auth/auth.module';
import { createGraphqlConfig } from './app/graphql/config';

const envPath = path.resolve('.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPath,
      load: [postgresConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = configService.get<string>('NODE_ENV');
        console.log('ENV VALUE:', env);

        return createGraphqlConfig(env ?? 'prod')
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      ...configService.get('postgresConfig')!,
        entities: [User, Product, Cart, CartItem, Order, OrderItem],
      }),
    }),
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    AuthModule
  ],
})
export class AppModule {}
