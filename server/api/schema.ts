import { applyMiddleware } from 'graphql-middleware';
import { allow, rule, shield } from 'graphql-shield';
import { makeSchema } from 'nexus';
import { join } from 'path';

import * as types from '../gql';
import { getAccessToken } from '../utils/verifyToken';

const authenticate = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) return false;

  const token = authorization.split('Bearer ')[1];

  if (!token) return false;

  const isVerified = Boolean(getAccessToken(token));

  return isVerified;
});

const permissions = shield({
  Query: {
    '*': authenticate,
    helloWorld: allow,
    getNewAccessToken: allow,
    adminGetMany: allow,
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
