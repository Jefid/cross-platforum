const { User, GamePost } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// resolvers 
const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('gameposts')
        .populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('gameposts');
    },

   me: async (parent, args, context) => {
  if (context.user) {
    const userData = await User.findOne({ _id: context.user._id })
      .select('-__v -password')
      .populate('thoughts')
      .populate('friends');

    return userData;
  }

  throw new AuthenticationError('Not logged in');
},

    gameposts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return GamePost.find(params).sort({ createdAt: -1 });
    },
    gamepost: async (parent, { _id }) => {
      return GamePost.findOne({ _id });
    }
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
    addGamePost: async (parent, args, context) => {
      if (context.user) {
        const thought = await GamePost.create({ ...args, username: context.user.username });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { gamepost: gamepost._id } },
          { new: true }
        );
    
        return gamepost;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    addComment: async (parent, { gamepostId, commentBody }, context) => {
      if (context.user) {
        const updatedGamePost = await GamePost.findOneAndUpdate(
          { _id: gamepostId },
          { $push: { comments: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );
    
        return updatedGamePost;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');
    
        return updatedUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    }

  
  }

};

module.exports = resolvers;
