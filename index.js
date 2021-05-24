import express from 'express';
import apolloServer from 'apollo-server-express';
import mongoose from 'mongoose';


import config from './config.js';

import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';



const { ApolloServer } = apolloServer;
const { MONGO_DB } = config;
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });

mongoose.connect(MONGO_DB, { useNewUrlParser: true,  useUnifiedTopology: true }).then(() => {
    app.listen({ port: 4000 }, () => {
        console.log('Now browse to http://localhost:4000' + server.graphqlPath)
      });

})


    

