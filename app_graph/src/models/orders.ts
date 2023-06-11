import { ObjectId } from 'mongodb';
import mongoose, { Document, Model } from 'mongoose';

export enum ShippingMethod {
  Express = 'express',
  Pickup = 'pickup'
}

export interface IOrder extends Document {
  orderUserId: ObjectId;
  product: string;
  price: number;
  quantity: number;
  shippingMethod: ShippingMethod;
  color?: string;
  additionalNotes?: string;
  discount?: number;
  created_at?: Date;
  updated_at?: Date;
  // orderStatus: OrderStatus;
}

const orderSchema = new mongoose.Schema({
  // orderUserId: {
  //   type: mongoose.Schema.Types.ObjectId
  // },
  product: {
    type: String,
    required: [true, 'The product field is required.']
  },
  price: {
    type: Number,
    required: [true, 'The price field is required.']
  },
  quantity: {
    type: Number,
    required: [true, 'The quantity field is required.']
  },
  shippingMethod: {
    type: String,
    enum: Object.values(ShippingMethod),
    required: [true, 'The shipping method field is required.']
  },
  color: {
    type: String
  },
  additionalNotes: {
    type: String
  },
  discount: {
    type: Number
  },
  // Other fields...
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
  // orderStatus: {
  //   type: String,
  //   enum: Object.values(OrderStatus)
  // }
});

const Order: Model<IOrder> = mongoose.model<IOrder>('orders', orderSchema);

export default Order;
