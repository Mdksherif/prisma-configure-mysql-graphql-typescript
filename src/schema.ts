import { makeSchema } from 'nexus';
import { join } from 'path';
import { Employee } from './types/Employee';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';

const schema = makeSchema({
  types: [Query, Mutation, Employee],
  outputs: {
    schema: join(__dirname, '..', 'schema.graphql'),
    typegen: join(__dirname, 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
    export: 'Context',
  },
});

export default schema;
