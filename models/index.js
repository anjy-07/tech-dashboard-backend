const { gql } = require('apollo-server-express');

module.exports = gql `
    type User {
        id: String!
        name: String!
        email: String!
        password: String!
        bio: String
        mobile: String
        username: String
        plan: String
        active: Boolean
        Type: String
        date_created: String
        date_updated: String
        boards : [Board]
    },
    type Board {
        id: String!
        name: String!
        category: String!
        tags: String!
        pins: [String]
        created_at: String!
        updated_at: String!
    },
    type Pin {
        id: String
        name: String!
        description: String
        url: String!
        image: String
        category: String
        tags: String
        created_at: String!
        updated_at: String!
    },
    type Query {
     boards: [Board],
     boardsByUser: [Board],
     boardByCategory: [Board],
     boardByTags: [Board],
     pins: [Pin],
     pinsByBoard: [Pin],
     pinByCategory: [Pin],
     pinByTags: [Pin],
     hello: String
    }
    type Mutation {
        createBoard(name: String!, category: String, tags: [String]): Board
        updateBoard(name: String!, category: String, tags: [String]): Board
        addPinToBoard(boardId: String!, name: String!, description: String, url: String!, category: String, tags: String): Pin
    }
 
`;