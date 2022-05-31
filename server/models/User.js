const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js and Course.js
const bookSchema = require('./Book');
const courseSchema = require('./Course');
const commentSchema = require('./Comment');
const recommendationSchema = require('./Recommendation');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    isMentor: {
      type: Boolean,
      required: true,
      default: false
    },
    savedCourses: [courseSchema],
    addedComments: [commentSchema],
    addedRecommendations: [recommendationSchema],
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `courseCount` with the number of saved courses we have
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});
// userSchema.virtual('courseCount').get(function () {
//   return this.savedCourses.length;
// });

const User = model('User', userSchema);

module.exports = User;
