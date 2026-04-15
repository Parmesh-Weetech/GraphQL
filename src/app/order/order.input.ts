import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from './types/order-status.type';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;
}

@InputType()
export class FindOrdersByUserInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;
}

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => ID)
  @IsUUID()
  orderId: string;

  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
