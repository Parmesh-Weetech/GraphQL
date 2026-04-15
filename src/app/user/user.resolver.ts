import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './types/user-role.type';

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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => User, { nullable: true })
  async createUser(@Args('input') input: CreateUserInput) {
    return await this.userService.create(input);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return await this.userService.update(id, input);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => Boolean, { nullable: false })
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return await this.userService.remove(id);
  }
}
