import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./auth.input";
import { AuthResponse } from "./auth.output";

@Resolver(() => AuthResponse)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthResponse, { nullable: false })
    async login(
        @Args('input') input: LoginInput
    ) {
        return this.authService.login(input);
    }
}
