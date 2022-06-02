const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCourses` array in User.js
const courseSchema = new Schema (
    {
        institution: {
            type: String,
            required: true
        },
        courseTitle: {
            type: String,
            required: 'Title is Required',
            maxlength: 100
        },
        description: {
            type: String,
            required: 'Description is Required',
        },
        courseAuthor: {
            type: String,
            required: true,
            trim: true,
        }
    }
);

const Course = model('Course', courseSchema);

module.exports = Course;