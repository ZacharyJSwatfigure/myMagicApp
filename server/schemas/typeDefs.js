const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    user(_id: String!): User
    users: [User!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    deleteUser(_id: String!): User
  }
`;

module.exports = typeDefs;
