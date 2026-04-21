import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './user.input';
import {
  IUserRepository
} from './interfaces/user-repository.interface';
import { UserRepositoryPostgres } from './repositories/user.repository.postgres';
import { UserRepositoryMongo } from './repositories/user.repository.mongo';
import { DbProvider } from '../common/enums/db-provider.enum';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';
import { UserType } from './types/user-repository.type';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserRepositoryPostgres))
    private readonly userRepositoryPostgres: UserRepositoryPostgres,
    @Inject(forwardRef(() => UserRepositoryMongo))
    private readonly userRepositoryMongo: UserRepositoryMongo,
  ) {}

  private getRepository(dbProvider?: DbProvider): IUserRepository {
    const provider = dbProvider ?? DbProvider.POSTGRES;
    return provider === DbProvider.MONGODB
      ? this.userRepositoryMongo
      : this.userRepositoryPostgres;
  }

  async create(
    createUserReq: CreateUserInput,
    dbProvider?: DbProvider,
  ): Promise<UserType | null> {
    try {
      const user = await this.getRepository(dbProvider).create(createUserReq);
      return user ?? null;
    } catch (error: any) {
      if (error.message === 'User already exists') {
        throw CustomExceptionFactory.create(ErrorCodes.USER_EXISTS);
      }
      throw CustomExceptionFactory.create(ErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(dbProvider?: DbProvider): Promise<UserType[] | []> {
    return this.getRepository(dbProvider).findAll();
  }

  async findOne(
    id: string,
    dbProvider?: DbProvider,
  ): Promise<UserType | null> {
    return this.getRepository(dbProvider).findOne(id);
  }

  async findByEmail(
    email: string,
    dbProvider?: DbProvider,
  ): Promise<UserType | null> {
    return this.getRepository(dbProvider).findByEmail(email);
  }

  async remove(id: string, dbProvider?: DbProvider): Promise<Boolean> {
    await this.findOne(id);

    const result = await this.getRepository(dbProvider).remove(id);

    if (!result) {
      throw CustomExceptionFactory.create(ErrorCodes.INTERNAL_SERVER_ERROR);
    }

    return result;
  }

  async update(
    id: string,
    input: UpdateUserInput,
    dbProvider?: DbProvider,
  ): Promise<UserType | null> {
    const user = await this.getRepository(dbProvider).findOne(id);

    if (!user) {
      throw CustomExceptionFactory.create(ErrorCodes.USER_NOT_FOUND);
    }

    return this.getRepository(dbProvider).update(id, input);
  }
}
