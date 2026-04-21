import { Cart } from "../cart.entity";
import { Cart as CartMongoose } from '../cart.schema'

export type CartType = Cart | CartMongoose;