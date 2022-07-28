import { gql } from '@apollo/client';

export const QUERY_GAMEPOSTS = gql`
<<<<<<< HEAD
  query thoughts($username: String) {
    gameposts(username: $username) {
      _id
      thoughtText
=======
  query gameposts($username: String) {
    gameposts(username: $username) {
      _id
      gamePlayed
>>>>>>> 5ac4346d3994aa1f67d8cb4aea6cf86873afcf47
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