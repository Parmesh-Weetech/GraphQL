import { Product } from "../product.entity";
import { ProductDocument } from '../product.schema'

export type ProductType = Product | ProductDocument;