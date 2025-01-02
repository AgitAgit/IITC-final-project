import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  sites: mongoose.Schema.Types.ObjectId[];
}

export type IUserWithoutId = Omit<IUser, "id">;
