import mongoose, { Schema, Model } from "mongoose";
import { IComponent } from "../types/componentTypes";

const componentsSchema: Schema<IComponent> = new mongoose.Schema({
  page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  type: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  position: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  style: { type: Object, default: {} },
});

const Component: Model<IComponent> = mongoose.model<IComponent>(
  "Component",
  componentsSchema
);

export default Component;
