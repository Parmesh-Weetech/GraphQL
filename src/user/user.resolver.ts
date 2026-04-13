import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { UserService } from './user.service';

const users: { id: string; name: string }[] = [];
@Resolver(() => User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello World';
  }

  constructor(private userService: UserService) { }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User, { nullable: true })
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }
}
