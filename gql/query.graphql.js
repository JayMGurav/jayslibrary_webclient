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