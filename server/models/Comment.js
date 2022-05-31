const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema (
  {
    commentId: { 
      type: String,
      required: true
    },
    aboutMe: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true
    },
    bootcampExp: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true
    },
    tipsTricks: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true
    },
    connections: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true
    },
    uniInst: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      trim: true
    },
    commentAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  }
);

module.exports = commentSchema;