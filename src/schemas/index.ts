import { builder } from './builder';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import './types';

builder.queryType({});
builder.mutationType({});

const schema = builder.toSchema({});

export default schema;

const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFileSync('./src/__generated__/schema.graphql', schemaAsString);
