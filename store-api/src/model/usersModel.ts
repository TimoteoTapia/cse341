import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  userEmail: string;
  userPassword: string;
}

const userSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  userEmail: {
    type: String
  },
  userPassword: {
    type: String
  }
});

const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export default User; 