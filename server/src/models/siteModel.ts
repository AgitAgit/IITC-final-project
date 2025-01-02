import mongoose, { Schema, Model } from "mongoose";
import { ISite } from "../types/siteTypes"; 

const siteSchema: Schema<ISite> = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  domain: { type: String, unique: true },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
  createdAt: { type: Date, default: Date.now },
  theme: { type: String, default: "default" },
});

const Site: Model<ISite> = mongoose.model<ISite>("Site", siteSchema);

export default Site;
