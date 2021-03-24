import 'reflect-metadata';
import ormConfig from '../config/ormConfig';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { ProductResolver } from './resolver';

async function main() {
  await createConnection(ormConfig);
  const schema = await buildSchema({
    resolvers: [ProductResolver]
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log('Server has started!');
}

main();
