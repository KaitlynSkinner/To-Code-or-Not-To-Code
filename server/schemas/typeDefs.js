const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    isMentor: String!
    recommendations: [Recommendation]!
    courses: [Course]!
    couseCount: Int
    savedCourses: [Course]
  }

  type Recommendation {
    _id: ID
    recommendationText: String!
    recommendationAuthor: String!
    createdAt: String
    upvotedBy: [User]!
    downvotedBy: [User]!
    comments: [Comment]!
  }
    
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Course {
    _id: ID
    institution: String
    courseTitle: String!
    description: String
    courseAuthor: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    mentors(isMentor: String!): User
    recommendations(username: String!): [Recommendation]
    recommendation(recommendationId: ID): Recommendation
    courses(username: String!): [Course]
    course(courseId: ID): Course
  }

  input SavedCourseInput {
    institution: String
    courseTitle: String!
    category: String
    description: String
    courseAuthor: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, isMentor: String!): Auth
    deleteUser(username: String!, email: String!, password: String!, isMentor: String!):Auth
    addRecommendation(recommendationText: String!, recommendationAuthor: String!): Recommendation
    addComment(
      recommendationId: ID!
      commentText: String!
      commentAuthor: String!
    ): Recommendation
    removeRecommendation(recommendationId: String!): Recommendation
    removeComment(recommendationId: ID!, commentId: ID!): Recommendation
    addCourse(
      institution: String! 
      courseTitle: String! 
      description: String!
      courseAuthor: String!
    ): Course
    saveCourse(input: SavedCourseInput): User
    removeCourse(courseId: String!): User
  }
`;

module.exports = typeDefs;