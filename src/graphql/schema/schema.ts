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
        createdAt: String
        updatedAt: String
    },
    type Board {
        id: String!
        name: String!
        category: String!
        tags: [String]
        pins: [Pin]
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
        tags: [String]
        created_at: String!
        updated_at: String!
    },
    input UserInput {
        id: String
        name: String!
        email: String!
        bio: String
        mobile: String
        username: String
        plan: String
        active: Boolean
        type: String
        boards: [BoardInput]!
    }
    input BoardInput {
        id: String
        name: String!
        category: String!
        tags: [String]
    },
    input PinInput {
        id: String
        name: String!
        description: String
        url: String!
        image: String
        category: String
        tags: [String]
    }
    type Query {
        user(userId: String!): User
        boards(userId: String!): [Board]
        boardByCategory(userId: String!, category: String!): [Board]
        boardByTags(userId: String!, tags: [String!]!): [Board]
        pinsByBoard(userId: String!, boardId: String!): [Pin]
    }
    type Mutation {
        createUser(user: UserInput): User
        updateUser(user: UserInput): User
        deleteUser(userId: String): Boolean
        createBoard(userId: String!, board: BoardInput!): Board
        updateBoard(userId: String!, board: BoardInput!): Board
        deleteBoard(userId: String!, boardId: String!): Boolean
        addPinToBoard(userId: String!, boardId: String!, pin: PinInput!): Pin
        deletePinFromBoard(userId: String!, boardId: String!, pinId: String!): Boolean
    }
`;