import apolloServer from 'apollo-server-express';

const { gql } = apolloServer;

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    sayHi: String
    getPosts: [Post]
  }
`;

export default typeDefs;