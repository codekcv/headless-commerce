/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from './api/context';
import type { FieldAuthorizeResolver } from 'nexus/dist/plugins/fieldAuthorizePlugin';

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  Admin: {
    // root type
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
    password: string; // String!
    username: string; // String!
  };
  AdminLoginInfo: {
    // root type
    password: string; // String!
    username: string; // String!
  };
  Customer: {
    // root type
    age: number; // Int!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    itemsBought: Array<NexusGenRootTypes['Item'] | null>; // [Item]!
    lastName: string; // String!
    password: string; // String!
    username: string; // String!
  };
  Item: {
    // root type
    description: string; // String!
    id: string; // ID!
    name: string; // String!
    price: number; // Float!
  };
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;

export interface NexusGenFieldTypes {
  Admin: {
    // field return type
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
    password: string; // String!
    username: string; // String!
  };
  AdminLoginInfo: {
    // field return type
    password: string; // String!
    username: string; // String!
  };
  Customer: {
    // field return type
    age: number; // Int!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    itemsBought: Array<NexusGenRootTypes['Item'] | null>; // [Item]!
    lastName: string; // String!
    password: string; // String!
    username: string; // String!
  };
  Item: {
    // field return type
    description: string; // String!
    id: string; // ID!
    name: string; // String!
    price: number; // Float!
  };
  Mutation: {
    // field return type
    adminLogin: string | null; // String
    adminLogout: string | null; // String
    adminUpdate: NexusGenRootTypes['Admin'] | null; // Admin
    customerCreateOne: NexusGenRootTypes['Customer'] | null; // Customer
    itemCreateOne: NexusGenRootTypes['Item'] | null; // Item
  };
  Query: {
    // field return type
    adminGet: NexusGenRootTypes['Admin'] | null; // Admin
    adminGetLoginInfo: NexusGenRootTypes['AdminLoginInfo'] | null; // AdminLoginInfo
    customerGetMany: Array<NexusGenRootTypes['Customer'] | null> | null; // [Customer]
    customerGetOne: NexusGenRootTypes['Customer'] | null; // Customer
    itemGetMany: Array<NexusGenRootTypes['Item'] | null> | null; // [Item]
    itemGetOne: NexusGenRootTypes['Item'] | null; // Item
  };
}

export interface NexusGenFieldTypeNames {
  Admin: {
    // field return type name
    email: 'String';
    firstName: 'String';
    id: 'ID';
    lastName: 'String';
    password: 'String';
    username: 'String';
  };
  AdminLoginInfo: {
    // field return type name
    password: 'String';
    username: 'String';
  };
  Customer: {
    // field return type name
    age: 'Int';
    email: 'String';
    firstName: 'String';
    id: 'ID';
    itemsBought: 'Item';
    lastName: 'String';
    password: 'String';
    username: 'String';
  };
  Item: {
    // field return type name
    description: 'String';
    id: 'ID';
    name: 'String';
    price: 'Float';
  };
  Mutation: {
    // field return type name
    adminLogin: 'String';
    adminLogout: 'String';
    adminUpdate: 'Admin';
    customerCreateOne: 'Customer';
    itemCreateOne: 'Item';
  };
  Query: {
    // field return type name
    adminGet: 'Admin';
    adminGetLoginInfo: 'AdminLoginInfo';
    customerGetMany: 'Customer';
    customerGetOne: 'Customer';
    itemGetMany: 'Item';
    itemGetOne: 'Item';
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    adminLogin: {
      // args
      password: string; // String!
      username: string; // String!
    };
    adminUpdate: {
      // args
      firstName?: string | null; // String
      lastName?: string | null; // String
    };
    customerCreateOne: {
      // args
      email: string; // String!
      firstName: string; // String!
      lastName: string; // String!
      password: string; // String!
      username: string; // String!
    };
    itemCreateOne: {
      // args
      description: string; // String!
      name: string; // String!
      price: number; // Float!
    };
  };
  Query: {
    customerGetMany: {
      // args
      filter?: string | null; // ID
    };
    customerGetOne: {
      // args
      id: string; // ID!
    };
    itemGetMany: {
      // args
      filter?: string | null; // ID
    };
    itemGetOne: {
      // args
      id: string; // ID!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>;
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
