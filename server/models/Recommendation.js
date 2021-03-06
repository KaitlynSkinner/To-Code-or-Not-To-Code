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
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
});

const Recommendation = model('Recommendation', recommendationSchema);

module.exports = Recommendation;