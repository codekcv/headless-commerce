import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import { join } from 'path';

import * as types from '../gql';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'nexus-schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
  plugins: [fieldAuthorizePlugin()],
  prettierConfig: join(__dirname, '/../../.prettierrc.js'),
});
