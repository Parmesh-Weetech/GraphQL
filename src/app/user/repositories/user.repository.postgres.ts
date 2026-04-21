import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserInput, UpdateUserInput } from '../user.input';
import {
  IUserRepository
} from '../interfaces/user-repository.interface';
import { randomBytes } from 'node:crypto';
import { createHashPassword } from '../util/passwordHash';
import { UserType } from '../types/user-repository.type';

@Injectable()
export class UserRepositoryPostgres implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserType[] | []> {
    const users = await this.userRepository.find();
    return users.length > 0 ? users : [];
  }

  async findOne(id: string): Promise<UserType | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserType | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(data: CreateUserInput): Promise<UserType> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHashPassword(data.password, salt);

    const user = await this.userRepository.save(
      this.userRepository.create({
        email: data.email,
        name: data.name,
        password: hashedPassword,
        userRole: data.userRole,
        salt,
      }),
    );

    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<UserType | null> {
    await this.userRepository.update(id, {
      name: data.name,
      email: data.email,
      userRole: data.userRole,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
