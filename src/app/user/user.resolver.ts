import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => [User])
  async listUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async findUserById(@Args('id', { type: () => ID }) id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Args('input') input: CreateUserInput) {
    return await this.userService.create(input);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return await this.userService.update(id, input);
  }

  @Mutation(() => Boolean, { nullable: false })
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return await this.userService.remove(id);
  }
}
