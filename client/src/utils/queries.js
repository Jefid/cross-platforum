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

export const QUERY_GAMEPOST = gql`
  query gamepost($id: ID!) {
    gamepost(_id: $id) {
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

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      gameposts {
        _id
        gamePlayed
        createdAt
        commentCount
      }
    }
  }
`;