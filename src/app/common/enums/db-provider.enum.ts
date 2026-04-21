import { registerEnumType } from '@nestjs/graphql';

export enum DbProvider {
  POSTGRES = 'postgres',
  MONGODB = 'mongodb',
}

registerEnumType(DbProvider, { name: 'DbProvider' });
