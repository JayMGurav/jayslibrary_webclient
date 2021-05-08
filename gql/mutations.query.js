import { gql } from '@apollo/client';

export const ADD_BOOK_COMMENT = gql`
  mutation AddBookComment($comment: String!, $bookId: ID!)  {
    addBookComment(comment: $comment, bookId: $bookId) {
      id
      comment
      bookId
      createdAt
    }
  }
`;

export const UPVOTE_BOOK = gql`
  mutation voteBook($bookId: ID!)  {
    voteBook(bookId: $bookId) 
  }
`;

export const SUGGEST_BOOK = gql`
  mutation voteBook($title: String!, $author: String!)  {
    suggestBook(title: $title, author: $author){
      id
      title
      author
    }
  }
`;

