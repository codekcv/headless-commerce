import 'dotenv/config';

import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import { context } from './context';
import { schema } from './schema';

const PORT = process.env.PORT || 4000;

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    context,
    introspection: true,
    playground: true,
  });

  await server.start();

  const app = new Koa();
  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: PORT }, resolve as () => void)
  );

  console.log(`🚀 Server ready at port:${PORT}/${server.graphqlPath}`);
}

startApolloServer();
