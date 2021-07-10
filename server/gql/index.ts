import { queryField } from 'nexus';

export * from './Admin';
export * from './Customer';
export * from './Item';
export * from './ItemView';
export * from './Order';
export * from './Scalar';

export const HELLO_WORLD = queryField('helloWorld', {
  type: 'String',
  resolve: () => 'Hello World',
});
