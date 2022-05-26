const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: 'Username is Required',
      unique: true,
      minlength: 4,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      trim: true,
      required: 'Password is Required',
      minlength: 6
    },
    userCreated: {
      type: Date,
      default: Date.now
    },
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
userSchema.virtual('courseCount').get(function () {
  return this.savedCourses.length;
});

const User = model('User', userSchema);

module.exports = User;
