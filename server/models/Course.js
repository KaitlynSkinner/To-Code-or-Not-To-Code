const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCourses` array in User.js
const courseSchema = new Schema (
    {
        courseId: { 
            type: String,
            required: true
        },
        institution: {
            type: String,
            required: true
        },
        courseTitle: {
            type: String,
            required: 'Title is Required',
            maxlength: 20
        },
        category: {
            type: String,
            enum: ['Javascript', 'HTML', 'CSS', 'SQL', 'NoSQL', 'React', 'Python', 'Java', 'C#', 'C++']
        },
        difficultyLevel: {
            type: String,
            enum: ['Beginner', 'Intermidiate', 'Advanced', 'All levels']
        },
        description: {
            type: String,
            required: 'Description is Required',
        },
    }
);

module.exports = courseSchema;