import { gql } from 'apollo-server-express';

export const typeDefs = gql` 
    type User {
        id: String!
        name: String!
        email: String!
        bio: String
        mobile: String
        username: String
        plan: String
        active: Boolean
        type: String
        dateCreated: String
        dateUpdated: String
        boards : [Board]
    },
    type Board {
        id: String!
        name: String!
        category: String!
        tags: String!
        pins: [String]
        createdAt: String!
        updatedAt: String!
    },
    type Pin {
        id: String!
        name: String!
        description: String
        url: String!
        image: String
        category: String
        tags: String
        created_at: String!
        updated_at: String!
    },
    input BoardInput {
        id: String
        name: String!
        category: String!
        tags: String!
        pins: [String]
        createdAt: String!
        updatedAt: String!
    },
    input PinInput {
        id: String
        name: String!
        description: String
        url: String!
        image: String
        category: String
        tags: String
        created_at: String!
        updated_at: String!
    }
    type Query {
    boards(userId: String!): [Board],
    boardByCategory(userId: String!, category: [String]): [Board],
    boardByTags(userId: String!, tags: [String]): [Board],
    pins(userId: String!): [Pin],
    pinsByBoard(userId: String!, boardId: String!): [Pin],
    pinByCategory(userId: String!, category: [String]): [Pin],
    pinByTags(userId: String!, tags: [String]): [Pin]
    }
    type Mutation {
        createBoard(userId: String!, board: BoardInput!): Board
        updateBoard(userId: String!, board: BoardInput!): Board
        addPinToBoard(userId: String!, boardId: String!, pin: PinInput!): Pin
    }
`;