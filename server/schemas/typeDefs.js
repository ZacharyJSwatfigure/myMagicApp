const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String
  }
  type Auth {
    token: String
    user: User
  }

  # this is the start of the trades type def.
  type Trade {
    _id: ID
    totalPrice: Float
    date: String
    collection: [Card]
  }

  # type fullCard {
  #   _id: ID
  #   cardId: ID
  #   name: String
  #   imageUrl: String
  #   price: Float
  # }
  type Card {
    _id: ID
    cardId: ID
    # if this type is true it is a trade away card. False is a receiving card.
    typeOfTrade: Boolean
    price: Float
  }
  input TradeInput {
    date: Int
    TotalPrice: Float
    cards: [cardInput]
  }
  input cardInput {
    cardId: ID
    tradeAway: Boolean
    price: Float
  }

  type Query {
    me: User
    user(_id: String!): User
    users: [User!]!
    getTrades: [Trade]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    deleteUser(_id: String!): User
    createTrade(trade: TradeInput!): ID
  }
`;

module.exports = typeDefs;
