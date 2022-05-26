const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const mentorSchema = new Schema(
  {
    mentorName: {
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
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash mentor password
mentorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
mentorSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

mentorSchema.virtual('recommendationCount').get(function () {
  return this.savedRecommendations.length;
});

const Mentor = model('Mentor', mentorSchema);

module.exports = Mentor;
