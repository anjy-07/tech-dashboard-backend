import { User } from '../../models/user';
import { createUser, deleteUser, getUser, updateUser } from '../../persistence/user-crud';

export const userResolvers = {
    Query: {
        user: (_: any, args: any) => {
            const userId = args?.userId;
            return getUser(userId)
                .then(user => user)
                .catch(e => {
                    const message = `Cannot fetch user with id ${userId} because of: ${e}`;
                    throw new Error(message);
                });
        }
    },
    Mutation: {
        createUser: (_: any, args: any) => {
            const user = args?.user as User;
            return createUser(user)
                .then(newUser => newUser)
                .catch(e => {
                    const message = `Cannot create user with id ${user.id} because of: ${e}`;
                    throw new Error(message);
                });
        },
        updateUser: (_: any, args: any) => {
            const user = args?.user as User;
            return updateUser(user)
                .then(updatedUser => updatedUser)
                .catch(e => {
                    const message = `Cannot update user with id ${user.id} because of: ${e}`;
                    throw new Error(message);
                });;
        },
        deleteUser: (_: any, args: any) => {
            const userId = args?.userId as string;
            return deleteUser(userId)
                .then(isUserDeleted => isUserDeleted)
                .catch(e => {
                    const message = `Cannot delete user data because of: ${e}`;
                    throw new Error(message);
                });
        },
    }
}