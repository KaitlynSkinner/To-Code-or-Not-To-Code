const { AuthenticationError } = require('apollo-server-express');
const { User, Book, Course, Recommendation, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('courses')
        .populate('comments');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('courses')
        .populate('comments');
    },
    // comments: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Comment.find(params).sort({ createdAt: -1 });
    // },
    // comment: async (parent, { commentId }) => {
    //   return Comment.findOne({ _id: commentId });
    // }
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (parent, args) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { user: { _id: id } } },
          { new: true, }
        )

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
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
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        )
        .populate('savedBooks');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true, }
        )
        .populate('savedBooks');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    saveCourse: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedCourses: input } },
          { new: true, runValidators: true }
        )
        .populate('savedCourses');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeCourse: async (parent, { courseId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCourses: { courseId: courseId } } },
          { new: true, }
        )
        .populate('savedCourses');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { input, commentAuthor }, context) => {
      const comment = await Comment.create({ commentAuthor });

      await User.findOneAndUpdate(
        { username: commentAuthor },
        { $addToSet: { comments: comment._id } }
      );

      return comment;
    },
    removeComment: async (parent, { commentId }) => {
      return Comment.findOneAndDelete({ _id: commentId });
    },
    addRecommendation: async (parent, { input, recommendationAuthor, isMentor }, context) => {
      const recommendation = await Recommendation.create({ recommendationAuthor });

      await User.findOneAndUpdate(
        { isMentor: recommendationAuthor },
        { $addToSet: { addedRecommendations: recommendation._id } }
      );

      return recommendation;
    },
    removeRecommendation: async (parent, { recommendationId }) => {
      return Recommendation.findOneAndDelete({ _id: recommendationId });
    },
  }
};

module.exports = resolvers;
