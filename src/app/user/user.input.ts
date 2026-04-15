import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UserRole } from './types/user-role.type';

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    userRole: UserRole;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) { }