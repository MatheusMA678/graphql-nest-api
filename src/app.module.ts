import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { UserService } from './user.service';
import { PrismaService } from './prisma/prisma.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.originalError?.message || error?.message,
        };
        return graphQLFormattedError;
      },
    })
  ],
  controllers: [],
  providers: [UserResolver, PrismaService, UserService],
})
export class AppModule { }
