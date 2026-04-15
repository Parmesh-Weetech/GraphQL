import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class AddToCartInput {
  @Field(() => ID)
  @IsUUID()
  productId: string;

  @Field()
  @IsNumber()
  quantity: string;
}

@InputType()
export class UpdateCartItemInput {
  @Field(() => ID)
  @IsUUID()
  cartItemId: string;

  @Field()
  @IsNumber()
  quantity: string;
}

@InputType()
export class RemoveFromCartInput {
  @Field(() => ID)
  @IsUUID()
  cartItemId: string;
}
