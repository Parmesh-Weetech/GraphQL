import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class UpdateUserInput {
    @Field({ nullable: false })
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    email?: string;
}