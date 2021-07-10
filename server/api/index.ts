import 'dotenv/config';

import cors from '@koa/cors';
import Router from '@koa/router';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { context } from './context';
import refreshToken from './refreshToken';
import { schema } from './schema';

const PORT = process.env.PORT || 4000;

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ({ ctx }) => {
      return { ...ctx, ...context };
    },
  });

  await server.start();

  const app = new Koa();
  const router = new Router();

  router.post('/refresh_token', refreshToken);

  app.use(cors({ origin: '*', credentials: true }));
  app.use(router.routes()).use(router.allowedMethods());

  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: PORT }, resolve as () => void)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at port:${PORT}/${server.graphqlPath}`);
};

startApolloServer();
