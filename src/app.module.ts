import { Module } from '@nestjs/common';
import * as path from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './app/user/user.module';
import { graphqlConfig } from './app/graphql/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './app/config/pg.config';
import { User } from './app/user/user.entity';
import { ProductModule } from './app/product/product.module';
import { Product } from './app/product/product.entity';

const envPath = path.resolve('.env');

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPath,
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('postgresConfig')!,
        entities: [User, Product],
      }),
    }),
    UserModule,
    ProductModule
  ],
})
export class AppModule {}
