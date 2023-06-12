import User, { IUser, Notification } from '../../models/users';
import { AuthenticationError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import { validatePassword } from '../../utils/passwordComplexityCheck';

const resolversUsers = {
  Query: {
    getAllUser: async (_: any, __: any, context: any): Promise<IUser[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const users: IUser[] = await User.find();
        return users;
      } catch (err) {
        throw err;
      }
    },
    getUserById: async (_: any, args: { _id: string }, context: any): Promise<IUser[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const userId = new ObjectId(args._id);
        const users: IUser[] = await User.find({ _id: userId });
        return users;
      } catch (err) {
        throw err;
      }
    },
    getUserByStatus: async (
      _: any,
      args: { notification: Notification },
      context: any
    ): Promise<IUser[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const users: IUser[] = await User.find({ shippingMethod: args.notification });
        return users;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createNewUser: async (
      _: any,
      args: {
        users: {
          username: string;
          password: string;
          email: string;
          phone: number;
          age: number;
          notification: Notification;
        };
      },
      context: any
    ): Promise<IUser> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const { password } = args.users;
        const isPasswordValid: boolean = validatePassword(password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        const newUser: IUser = new User({ ...args.users });
        await newUser.save();
        return newUser;
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      _: any,
      args: {
        _id: string;
        users: {
          username: string;
          password: string;
          email: string;
          phone: number;
          age: number;
          notification: Notification;
        };
      },
      context: any
    ): Promise<IUser> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const { password } = args.users;
        const isPasswordValid: boolean = validatePassword(password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        const updateIdUser = new ObjectId(args._id);
        const filter = { _id: updateIdUser };
        const update = {
          $set: { ...args.users }
        };
        const options = { returnOriginal: false };
        const updatedUser: IUser | null = await User.findOneAndUpdate(filter, update, options);
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (_: any, args: { _id: string }, context: any): Promise<string> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const userId = new ObjectId(args._id);
        const deletedUser: IUser | null = await User.findByIdAndDelete({ _id: userId });
        if (!deletedUser) {
          throw new Error('Appointment not found!');
        }
        return `This user with ID: ${deletedUser._id} deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default resolversUsers;
