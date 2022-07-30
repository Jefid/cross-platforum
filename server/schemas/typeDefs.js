const { gql } = require ('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID!
        username: String
        email: String
        friendCount: Int
        gameposts: [GamePost]
        friends: [User]
    }

    type GamePost {
        _id: ID
        gamePlayed: String
        createdAt: String
        username: String
        rating: Int
        review: String
        commentCount: Int
        comments: [Comment]
    }

     type Comment {
         _id: ID
         commentBody: String
         createdAt: String
         username: String
     }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        gameposts(username: String): [GamePost]
        gamepost(_id: ID!): GamePost
      }

      type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGamePost(gamePlayed: String!, rating: Int!): GamePost
        addComment(gamepostId: ID!, commentBody: String!): GamePost
        addFriend(friendId: ID!): User
    }

      type Auth {
        token: ID!
        user: User
      }
`;

module.exports = typeDefs;