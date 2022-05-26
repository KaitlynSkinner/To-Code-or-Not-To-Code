const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recommendationSchema = new Schema({
  recommendationText: {
    type: String,
    required: 'Please leave a recommendation!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  recommendationAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [commentSchema],
  upvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Recommendation = model('Recommendation', recommendationSchema);

module.exports = Recommendation;
