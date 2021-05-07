import { gql } from '@apollo/client';

export const ADD_BOOK_COMMENT = gql`
  mutation AddBookComment($comment: String!, $bookId: ID!)  {
    addBookComment(comment: $comment, bookId: $bookId) 
  }
`;

export const UPVOTE_BOOK = gql`
  mutation voteBook($bookId: ID!)  {
    voteBook(bookId: $bookId) 
  }
`;

