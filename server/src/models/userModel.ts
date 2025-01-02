import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../types/userTypes";

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true },
  googleId: { type: String, default: null },
  profileImage: { type: String, default: null },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Site" }],
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
