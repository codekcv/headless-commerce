import { applyMiddleware } from 'graphql-middleware';
import { allow, rule, shield } from 'graphql-shield';
import { makeSchema } from 'nexus';
import { join } from 'path';

import * as types from '../gql';
import { verifyAccessToken } from '../utils/verifyToken';

const authenticate = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) return false;

  const token = authorization.split(' ')[1];

  return verifyAccessToken(token);
});

const permissions = shield({
  Query: {
    '*': authenticate,
    helloWorld: allow,
    getNewAccessToken: allow, // Cookie Refresh Token
  },
  Mutation: {
    '*': authenticate,
    adminLogin: allow,
  },
});

export const schema = applyMiddleware(
  makeSchema({
    types,
    outputs: {
      typegen: join(__dirname, '..', 'nexus-typegen.ts'),
      schema: join(__dirname, '..', 'nexus-schema.graphql'),
    },
    contextType: {
      module: join(__dirname, './context.ts'),
      export: 'Context',
    },
    prettierConfig: join(__dirname, '/../../.prettierrc.js'),
  }),
  permissions
);
