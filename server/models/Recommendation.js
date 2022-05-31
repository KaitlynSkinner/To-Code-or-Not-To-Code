const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recommendationSchema = new Schema(
  {
    recommendationId: { 
        type: String,
        required: true
    },
    recommendationText: {
      type: String,
      required: 'Please leave a recommendation!',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    recommendationAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
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
    ]
  }
);

module.exports = recommendationSchema;