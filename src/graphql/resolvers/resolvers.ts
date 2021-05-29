import { boardResolvers } from './board-resolvers';
import { pinResolvers } from './pin-resolvers';
import { userResolvers } from './user-resolvers';

export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...boardResolvers.Query,
        ...pinResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...boardResolvers.Mutation,
        ...pinResolvers.Mutation
    }
}