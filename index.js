import express from 'express';
import apolloServer from 'apollo-server-express';
import mongoose from 'mongoose';


import config from './config.js';
import Posts from './models/Post.js'
import typeDefs from './typeDefs/index.js';



const { ApolloServer } = apolloServer;
const { MONGO_DB } = config;

const resolvers = {
    Query: {
        async getPosts(){
            try {
              const posts = await Posts.find();
              return posts
            } catch(error) {
                throw new Error(error)

            }
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


    

