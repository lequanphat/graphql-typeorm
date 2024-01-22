import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUser } from 'src/__mocks__/mock_user';
import { UserSetting } from '../models/UserSettings';
import { mockUserSetting } from 'src/__mocks__/mock_user_setting';

@Resolver(() => User)
export class UsersResolver {
  constructor() {}
  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUser.find((user) => user.id === id);
  }

  @Query(() => [User])
  getAllUsers() {
    return mockUser;
  }

  @ResolveField(() => UserSetting, { nullable: true, name: 'settings' })
  getAllUserSettings(@Parent() user: User) {
    console.log(user);
    return mockUserSetting.find((setting) => setting.userId === user.id);
  }
}
