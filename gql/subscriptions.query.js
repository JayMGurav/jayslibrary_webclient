import { gql } from '@apollo/client';

export const COMMENT_CREATED_SUBSCRIPTION = gql`
  subscription {
    commentedCreated {
      id
      comments{
        id
        comment
        createdAt
        bookId 
      }
    }
  }
`;

export const BOOK_UPVOTED_SUBSCRIPTION = gql`
  subscription {
    bookUpvoted {
      id
      voteCount
      votes
    }
  }
`;