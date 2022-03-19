import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { PrismaClient } from '@prisma/client';
import type PrismaTypes from '../__generated__';
import { resolvers } from 'graphql-scalars';
export const db = new PrismaClient();

type SchemaBuilderType = {
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
};

export const builder = new SchemaBuilder<SchemaBuilderType>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db
  }
});

builder.addScalarType('Date', resolvers.DateTime, {});
