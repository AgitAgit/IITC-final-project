import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../types/userTypes"; 

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Site" }],
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
