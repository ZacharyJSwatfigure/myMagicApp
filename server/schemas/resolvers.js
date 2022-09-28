const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { Trade } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findByIdAndDelete({ _id: _id });
      }
    },
    // createTrade: async (_root, { trade }, context) => {
    //   if (!context.user) {
    //     throw new AuthenticationError("No logged in user.");
    //   }
    //   trade["userId"] = context.user._id;
    //   const receiving = [];
    //   const tradeAway = [];
    //   trade.cards.map((c) => {
    //     if (c.tradeAway) {
    //       tradeAway.push(c);
    //     } else {
    //       receiving.push(c);
    //     }
    //   });
    //   const createdTrade = await trade.create(trade);
    //   return createdTrade._id;
    // },
  },
};

module.exports = resolvers;
