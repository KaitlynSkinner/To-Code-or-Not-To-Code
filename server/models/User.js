const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Course.js
const courseSchema = require('./Course');

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
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    recommendations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recommendation'
      }
    ]
  },
  // // set this to use virtual below
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // }
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
