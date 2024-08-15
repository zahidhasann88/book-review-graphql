import { ApolloServer } from 'apollo-server';
import typeDefs from './src/schema/typeDefs';
import resolvers from './src/schema/resolvers';
import connectDB from './src/utils/db';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});