const { AuthenticationError } = require('apollo-server-express');
const { User, Course, Recommendation, Comment } = require('../models');
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
        .populate('recommendations')
        .populate('courses');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('recommendations')
        .populate('courses');
    },
    recommendations: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recommendation.find(params).sort({ createdAt: -1 });
    },
    recommendation: async (parent, { recommendationId }) => {
      return Recommendation.findOne({ _id: recommendationId });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        // First we create the user
        const user = await User.create(args);

        // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
        const token = signToken(user);

        // Return an `Auth` object that consists of the signed token and user's information
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (parent, args) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { users: { username, email, password } } },
          { new: true, }
        )

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    addRecommendation: async (parent, { recommendationText, recommendationAuthor }) => {
      const recommendation = await Recommendation.create({ recommendationText, recommendationAuthor });

      await User.findOneAndUpdate(
        { username: recommendationAuthor },
        { $addToSet: { recommendations: recommendation._id } }
      );

      return recommendation;
    },
    addComment: async (parent, { recommendationId, commentText, commentAuthor }) => {
      return Recommendation.findOneAndUpdate(
        { _id: recommendationId },
        { 
          $addToSet: { comments: { commentText, commentAuthor } } 
        },
        { 
          new: true, 
          runValidators: true 
        }
      );
    },
    removeRecommendation: async (parent, { recommendationId }) => {
      return Recommendation.findOneAndDelete({ _id: recommendationId });
    },
    removeComment: async (parent, { recommendationId, commentId }) => {
      return Recommendation.findOneAndUpdate(
        { _id: recommendationId },
        { $pull: { comments: { _id: commentId} } },
        { new: true }
        );
    },
    addCourse: async (parent, { institution, courseTitle, description }) => {
      const course = await Course.create({ institution, courseTitle, description });

      await User.findOneAndUpdate(
        { username: recommendationAuthor },
        { $addToSet: { recommendations: recommendation._id } }
      );

      return recommendation;
    },
    // ** for future development - apis for courses **
    // saveCourse: async (parent, { input }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { savedCourses: input } },
    //       { new: true, runValidators: true }
    //     )
    //     .populate('savedCourses');

    //     return updatedUser;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // removeCourse: async (parent, { courseId }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedCourses: { courseId: courseId } } },
    //       { new: true, }
    //     )
    //     .populate('savedCourses');

    //     return updatedUser;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
  }
};

module.exports = resolvers;