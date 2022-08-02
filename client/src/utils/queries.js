import { gql } from '@apollo/client';

export const QUERY_GAMEPOSTS = gql`
  query gameposts($username: String) {
    gameposts(username: $username) {
      _id
      gamePlayed
      createdAt
      username
      rating
      review
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
      rating
      review
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
        rating
        review
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      gameposts {
        _id
        gamePlayed
        rating
        review
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;