import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      isMentor
      bookCount
      courseCount
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      },
      savedCourses {
        _id
        courseId
        courseTitle
        category
        difficultyLevel
        description
      },
      addedComments {
        commentId
        aboutMe
        bootcampExp
        tipsTricks
        connections
        uniInst
        commentAuthor
      },
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