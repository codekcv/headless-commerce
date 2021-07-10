import 'dotenv/config';

import cors from '@koa/cors';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { context } from './context';
import { schema } from './schema';

const PORT = process.env.PORT || 4000;

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ({ ctx }) => {
      return { ...ctx, ...context, cookies: ctx.cookies };
    },
  });

  await server.start();

  const app = new Koa();

  app.use(cors({ credentials: true }));

  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: PORT }, resolve as () => void)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at port:${PORT}/${server.graphqlPath}`);
};

startApolloServer();
