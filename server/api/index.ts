import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { schema } from './schema';

const PORT = process.env.PORT || 4000;

const startApolloServer = async () => {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ ctx }) => {
      return { ...ctx, prisma, cookies: ctx.cookies };
    },
  });

  await server.start();

  const app = new Koa();

  server.applyMiddleware({
    app,
    cors: { origin: process.env.CLIENT_ORIGIN, credentials: true },
  });

  await new Promise((resolve) =>
    app.listen({ port: PORT }, resolve as () => void)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at port:${PORT}${server.graphqlPath}`);
};

startApolloServer();
