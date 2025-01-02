import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  googleId: string;
  profileImage: string;
  role: string;
  sites: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

export type IUserWithoutId = Omit<IUser, "id">;
