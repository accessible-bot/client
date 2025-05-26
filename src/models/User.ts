import mongoose, { Schema, Document } from 'mongoose';
import { UserType } from '../dtos/enums/UserType';

export interface IUser extends Document {
  name: string;
  email?: string;
  password?: string;
  birthDate?: Date;
  userType: UserType;
  createdAt: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  birthDate: { type: Date },
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});


export const User = mongoose.model<IUser>('User', UserSchema);
