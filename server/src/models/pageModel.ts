import mongoose, { Schema, Model } from "mongoose";
import { IPage } from "../types/pageType";

const pageSchema: Schema<IPage> = new mongoose.Schema({
  site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: "Component" }],
  createdAt: { type: Date, default: Date.now },
  style: { type: Object, default: {} },
});

const Page: Model<IPage> = mongoose.model<IPage>("Page", pageSchema);

export default Page;
