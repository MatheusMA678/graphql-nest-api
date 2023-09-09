import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { User } from '../models/user.model';
import { UserService } from 'src/user.service';
import { CreateUserInput } from '../inputs/create-user.input';
import { compare, hash } from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(returns => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return await this.userService.users({})
  }

  @Query(returns => User, { name: 'user' })
  async getUserByEmail(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<User> {
    const user = await this.userService.user({ email })

    const isSamePassword = await compare(password, user.password)

    if (!isSamePassword) {
      throw new UnauthorizedException('Senha incorreta')
    }

    return user
  }

  @Mutation(returns => User, { name: 'user' })
  async createUser(@Args('data') args: CreateUserInput): Promise<User> {
    const isEmailExists = await this.userService.user({ email: args.email })

    if (isEmailExists) {
      throw new ConflictException('Esse email já está sendo usado')
    }

    const password = await hash(args.password, 8)

    return await this.userService.createUser({
      ...args,
      password
    })
  }

  @Mutation(returns => String, { name: 'deleteUser' })
  async deleteUserById(@Args('id', { type: () => Int }) id: number): Promise<string> {
    const user = await this.userService.user({ id })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    await this.userService.deleteUser({ id })

    return 'Deletado com sucesso'
  }
}