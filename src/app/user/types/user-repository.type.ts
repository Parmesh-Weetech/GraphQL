import { User } from "../user.entity";
import { UserDocument } from '../user.schema';

export type UserType = User | UserDocument;