import { User } from "../user.entity";
import { UserDocument as UserMongoose } from '../user.schema';

export type UserType = User | UserMongoose;