import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field()
    price: string;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
