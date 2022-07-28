import { gql } from '@apollo/client';

export const QUERY_GAMEPOSTS = gql`
  query thoughts($username: String) {
    gameposts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;