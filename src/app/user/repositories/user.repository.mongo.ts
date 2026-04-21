import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user.schema';
import { CreateUserInput, UpdateUserInput } from '../user.input';
import {
  IUserRepository,
} from '../interfaces/user-repository.interface';
import { randomBytes } from 'node:crypto';
import { createHashPassword } from '../util/passwordHash';
import { UserType } from '../types/user-repository.type';

@Injectable()
export class UserRepositoryMongo implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserType[] | []> {
    const users = await this.userModel.find().exec();
    return users.length > 0 ? users : [];
  }

  async findOne(id: string): Promise<UserType | null> {
    const user = await this.userModel.findById(id).exec();
    return user ?? null;
  }

  async findByEmail(email: string): Promise<UserType | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ?? null;
  }

  async create(data: CreateUserInput): Promise<UserType | null> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHashPassword(data.password, salt);

    const createdUser = new this.userModel({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      userRole: data.userRole,
      salt,
    });

    const savedUser = await createdUser.save();

    return savedUser ?? null;
  }

  async update(
    id: string,
    data: UpdateUserInput,
  ): Promise<UserType | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          name: data.name,
          email: data.email,
          userRole: data.userRole,
        },
        { new: true },
      )
      .exec();

    return updatedUser ?? null;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
