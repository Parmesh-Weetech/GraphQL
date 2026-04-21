import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument as UserModel, UserSchema } from './user.schema';
import { UserRepositoryPostgres } from './repositories/user.repository.postgres';
import { UserRepositoryMongo } from './repositories/user.repository.mongo';

@Module({
  providers: [
    UserService,
    UserResolver,
    UserRepositoryPostgres,
    UserRepositoryMongo,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  exports: [UserService],
})
export class UserModule {}
