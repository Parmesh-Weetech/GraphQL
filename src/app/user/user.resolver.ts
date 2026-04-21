import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './types/user-role.type';
import { DbProvider } from '../common/enums/db-provider.enum';

@Resolver(() => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => [User])
  async listUsers(
    @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider,
  ) {
    return await this.userService.findAll(dbProvider);
  }

  @Query(() => User, { nullable: true })
  async findUserById(
    @Args('id', { type: () => ID }) id: string,
    @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider,
  ) {
    return await this.userService.findOne(id, dbProvider);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => User, { nullable: true })
  async createUser(
    @Args('input') input: CreateUserInput,
    @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider,
  ) {
    return await this.userService.create(input, dbProvider);
  }

  @UseGuards(RoleGuard)
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
    @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider,
  ) {
    return await this.userService.update(id, input, dbProvider);
  }

  @UseGuards(RoleGuard)
  @Mutation(() => Boolean, { nullable: false })
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('dbProvider', { nullable: true }) dbProvider?: DbProvider,
  ) {
    return await this.userService.remove(id, dbProvider);
  }
}
