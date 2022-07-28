import { gql } from '@apollo/client';

export const QUERY_GAMEPOSTS = gql`
  query gameposts($username: String) {
    gameposts(username: $username) {
      _id
      gamePlayed
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