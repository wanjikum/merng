import express from 'express';
import apolloServer from 'apollo-server-express';
import mongoose from 'mongoose';
import config from './config.js';

const { ApolloServer, gql } = apolloServer;
const { MONGO_DB } = config;

const typeDefs = gql`
  type Query {
      sayHi: String
  }
`;

const resolvers = {
    Query: {
        sayHi: () => {
            return 'Hello World'
        }
    }
}
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });

mongoose.connect(MONGO_DB, { useNewUrlParser: true,  useUnifiedTopology: true }).then(() => {
    app.listen({ port: 4000 }, () => {
        console.log('Now browse to http://localhost:4000' + server.graphqlPath)
      });

})


    

