import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { PrismaClient, User } from '@prisma/client';
import type PrismaTypes from '../__generated__';
export const db = new PrismaClient();

type Context = {
  user: User;
};

type SchemaBuilderType = {
  Context: Context;
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

builder.scalarType('Date', {
  serialize: (date: any) => date.toISOString(),
  parseValue: (date: any) => new Date(date)
});
