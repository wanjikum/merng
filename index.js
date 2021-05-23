const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('moongose');
 
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
 
app.listen({ port: 4000 }, () => {
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
});


    

