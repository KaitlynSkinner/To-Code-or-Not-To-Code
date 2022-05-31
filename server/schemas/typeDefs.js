const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    isMentor: String!
    bookCount: Int
    savedBooks: [Book]
    couseCount: Int
    savedCourses: [Course]
    addedComments: [Comment]
  }

  type Book {
    _id: ID
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Course {
    id_: ID
    courseId: String!
    institution: String
    courseTitle: String!
    category: [String]
    difficultyLevel: [String]
    description: String
  }
  
  type Comment {
    commentId: String!
    aboutMe: String
    bootcampExp: String
    tipsTricks: String
    connections: String
    uniInst: String
    commentAuthor: [User]
  }

  type Recommendation {
    id_: ID
    recommendationId: String!
    recommendationText: String!
    recommendationAuthor: String!
    upvotedBy: String
    downvotedBy: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    mentor(isMentor: String!): User
  }

  input SavedBookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input SavedCourseInput {
    courseId: String!
    institution: String
    courseTitle: String!
    category: String
    description: String
  }

  input addCommentInput {
    commentId: String!
    aboutMe: String
    bootcampExp: String
    tipsTricks: String
    connections: String
    uniInst: String
    commentAuthor: String
  }

  input addRecommendationInput {
    recommendationId: String!
    recommendationText: String!
    recommendationAuthor: String!
    upvotedBy: String
    downvotedBy: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, isMentor: String!): Auth
    deleteUser(username: String!, email: String!, password: String!, isMentor: String!):Auth
    saveBook(input: SavedBookInput): User
    removeBook(bookId: String!): User
    saveCourse(input: SavedCourseInput): User
    removeCourse(courseId: String!): User
    addComment(input: addCommentInput): User
    removeComment(commentId: String!): User
    addRecommendation(input: addRecommendationInput): User
    removeRecommendation(recommendationId: String!): User
  }
`;

module.exports = typeDefs;