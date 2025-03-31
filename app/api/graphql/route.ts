import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../../graphql/schema';
import { resolvers } from '../../../graphql/resolvers';
import { initializeDatabase } from '../../../lib/db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Inicializa la base de datos al cargar la ruta
initializeDatabase();

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);