import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      isMentor
      courseCount
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