import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Query as TQuery } from 'type-graphql';

import { Roles } from 'src/roles/roles.decorators';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/role.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @Roles(Role.Admin)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Query('users')
  @Roles(Role.Admin)
  users() {
    return this.userService.findAll();
  }

  @Query('user')
  user(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Mutation('removeUser')
  removeUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }

  @TQuery(() => String, { name: 'login', nullable: true })
  @Mutation(() => String, { name: 'login', nullable: true })
  async login(
    @Args('name') name: string,
    @Args('password') password: string,
  ): Promise<Record<string, unknown>> {
    const user = await this.userService.login(name, password);
    if (user != null) {
      return this.userService.createToken({ id: user.id });
    }
    throw new HttpException(
      'error logging user in',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @TQuery(() => String, { name: 'register', nullable: true })
  @Mutation(() => User, { name: 'register', nullable: true })
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('password') password: string,
  ): Promise<Record<string, unknown>> {
    console.log('here: ', name, password, email, title, description);
    const user = await this.userService.register(
      name,
      password,
      email,
      title,
      description,
    );

    if (user != null) {
      return this.userService.createToken({ id: user.id });
    }

    throw new HttpException(
      'error registering user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
