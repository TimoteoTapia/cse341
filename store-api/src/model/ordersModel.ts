import { ObjectId } from 'mongodb';
import mongoose, { Document, Model } from 'mongoose';

export enum OrderStatus {
    Pending = 'pending',
    Delivered = 'delivered',
    Canceled = 'canceled' 
}

export interface IOrder extends Document {
  orderName: string;
  orderUserId: ObjectId;
  dateOrder: string;
  dateShipping: string;
  orderStatus: OrderStatus;
}

const orderSchema = new mongoose.Schema({
  orderName: {
    type: String
  },
  orderUserId: {
    type: mongoose.Schema.Types.ObjectId
  },
  dateOrder: {
    type: String
  },
  dateShipping: {
    type: String
  },
  orderStatus: {
    type: String,
    enum: Object.values(OrderStatus)
  }
});

const Order: Model<IOrder> = mongoose.model<IOrder>('orders', orderSchema);

export default Order;