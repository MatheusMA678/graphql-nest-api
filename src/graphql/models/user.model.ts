import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => Int, { description: 'ID do usuário' })
  id: number

  @Field({ description: 'Nome do usuário' })
  name: string

  @Field({ description: 'Email do usuário' })
  email: string

  @Field({ description: 'Senha do usuário' })
  password: string

  @Field({ description: 'Avatar do usuário', nullable: true })
  avatar_url?: string
}