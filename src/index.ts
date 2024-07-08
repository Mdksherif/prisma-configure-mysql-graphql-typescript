import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema';
import { context } from './context';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  schema,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => context,
    listen: { port: 4000 },
  });

  console.log(`Server is running on ${url}`);
})();
