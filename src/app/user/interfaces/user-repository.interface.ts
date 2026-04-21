import { UserType } from '../types/user-repository.type';
import { CreateUserInput, UpdateUserInput } from '../user.input';

export interface IUserRepository {
  findAll(): Promise<UserType[] | []>;
  findOne(id: string): Promise<UserType | null>;
  findByEmail(email: string): Promise<UserType | null>;
  create(data: CreateUserInput): Promise<UserType | null>;
  update(id: string, data: UpdateUserInput): Promise<UserType | null>;
  remove(id: string): Promise<boolean>;
}
