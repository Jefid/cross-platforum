const { gql } = require ('apollo-server-express');

// GraphQL typeDefs for models
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
        users: [User]
        user(username: String!): User
        gameposts(username: String): [GamePost]
        gamepost(_id: ID!): GamePost
      }
`

module.exports = typeDefs;