import { Order } from '../order.entity';
import { OrderDocument } from '../order.schema';

export type OrderType = Order | OrderDocument;
