import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query  {
    books {
      id
      title
      author
      cover
      stared
    }
  }
`;


export const BOOK_DETAILS_QUERY = gql`
  query Book($id: ID!){
    book(id: $id){
      id
      title
      author
      info
      caption
      cover
      stared
    }
  }
`;

export const BOOK_COMMENTS_QUERY = gql`
  query BookComments($id: ID!){
    book(id: $id){
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


export const BOOK_VOTES_QUERY = gql`
  query BookVotes($id: ID!){
    book(id: $id){
      id
      voteCount
      votes
    }
  }
`;