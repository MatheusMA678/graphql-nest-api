import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => String!, { description: 'ID do usuário' })
  id!: string

  @Field({ description: 'Nome do usuário' })
  name: string

  @Field({ description: 'Email do usuário' })
  email: string

  @Field({ description: 'Senha do usuário' })
  password: string

  @Field({ description: 'Avatar do usuário', nullable: true })
  avatar_url?: string
}