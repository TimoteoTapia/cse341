import mongoose, { Document, Model } from 'mongoose';

export enum Notification {
  Yes = 'yes',
  No = 'no'
}
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  phone?: number;
  age?: number;
  notification?: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 8,
    required: [true, 'The username field is required.'],
    index: { unique: true, sparse: true }
  },
  password: {
    type: String,
    required: [true, 'The password field is required.']
  },
  email: {
    type: String,
    required: [true, 'The email field is required.'],
    unique: [true, 'This email already exists'],
    validate: {
      validator: function (value: string) {
        // Add explicit type annotation for value
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format. Check to use @ and . symbol'
    }
  },
  phone: {
    type: Number
  },
  age: {
    type: Number,
    min: 18,
    max: 90
  },
  notification: {
    type: String,
    enum: Object.values(Notification)
  }
});

const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export default User;
