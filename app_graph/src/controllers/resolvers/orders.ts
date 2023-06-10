import Order, { IOrder, OrderStatus } from '../../models/orders';
import { AuthenticationError } from 'apollo-server';
import { ObjectId } from 'mongodb';

const resolversOrders = {
  Query: {
    getAllOrder: async (_: any, __: any, context: any): Promise<IOrder[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const orders: IOrder[] = await Order.find();
        return orders;
      } catch (err) {
        throw err;
      }
    },
    getOrderById: async (_: any, args: { _id: string }, context: any): Promise<IOrder[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const userId = new ObjectId(args._id);
        const orders: IOrder[] = await Order.find({ _id: userId });
        return orders;
      } catch (err) {
        throw err;
      }
    },
    getOrderByStatus: async (
      _: any,
      args: { orderStatus: OrderStatus },
      context: any
    ): Promise<IOrder[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const orders: IOrder[] = await Order.find({ orderStatus: args.orderStatus });
        return orders;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createNewOrder: async (
      _: any,
      args: {
        orders: {
          orderName: string;
          orderUserId: ObjectId;
          dateOrder: string;
          dateShipping: string;
          orderStatus: OrderStatus;
        };
      },
      context: any
    ): Promise<IOrder> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const newOrder: IOrder = new Order({ ...args.orders });
        await newOrder.save();
        return newOrder;
      } catch (err) {
        throw err;
      }
    },
    updateOrder: async (
      _: any,
      args: {
        _id: string;
        orders: {
          orderName: string;
          orderUserId: ObjectId;
          dateOrder: string;
          dateShipping: string;
          orderStatus: OrderStatus;
        };
      },
      context: any
    ): Promise<IOrder> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const updateIdOrder = new ObjectId(args._id);
        const filter = { _id: updateIdOrder };
        const update = {
          $set: { ...args.orders }
        };
        const options = { returnOriginal: false };
        const updatedOrder: IOrder | null = await Order.findOneAndUpdate(filter, update, options);
        if (!updatedOrder) {
          throw new Error('Order not found');
        }
        return updatedOrder;
      } catch (err) {
        throw err;
      }
    },
    deleteOrder: async (_: any, args: { _id: string }, context: any): Promise<string> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('User not authenticate');
      }
      try {
        const orderId = new ObjectId(args._id);
        const deletedOrder: IOrder | null = await Order.findByIdAndDelete({ _id: orderId });
        if (!deletedOrder) {
          throw new Error('Appointment not found!');
        }
        return `This order with ID: ${deletedOrder._id} deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default resolversOrders;
