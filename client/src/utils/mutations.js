import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_COURSE = gql`
  mutation saveCourse($input: SavedCourseInput!) {
    saveCourse(input: $input) {
      _id
      username
      email
      category
      savedCourses {
        _id
        courseId
        courseTitle
        category
        difficultyLevel
        description
      }
    }
  }
`;

export const REMOVE_COURSE = gql`
  mutation removeCourse($courseId: String!) {
    removeCourse(courseId: $courseId) {
      _id
      username
      email
      category
      savedCourses {
        _id
        courseId
        courseTitle
        category
        difficultyLevel
        description
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: SavedBookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($input: addCommentInput!) {
    addComment(input: $input) {
      _id
      username
      email
      addedComments {
        commentId
        aboutMe
        bootcampExp
        tipsTricks
        connections
        uniInst
        commentAuthor
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: String!) {
    removeComment(commentId: $commentId) {
      _id
      username
      email
      addedComments {
        commentId
        aboutMe
        bootcampExp
        tipsTricks
        connections
        uniInst
        commentAuthor
      }
    }
  }
`;

export const ADD_RECOMMENDATION = gql`
  mutation addRecommendation($input: addRecommendationInput!) {
    addRecommendation(input: $input) {
      _id
      username
      email
      isMentor
      addedRecommendations {
        recommendationId
        recommendationText
        recommendationAuthor
        upvotedBy
        downvotedBy
      }
    }
  }
`;

export const REMOVE_RECOMMENDATION = gql`
  mutation removeRecommendation($recommendationId: String!) {
    removeRecommendation(recommendationId: $recommendationId) {
      _id
      username
      email
      isMentor
      addedRecommendations {
        recommendationId
        recommendationText
        recommendationAuthor
        upvotedBy
        downvotedBy
      }
    }
  }
`;