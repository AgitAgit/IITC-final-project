import mongoose, { Document } from "mongoose";

export interface IPage extends Document {
  site: mongoose.Schema.Types.ObjectId;
  title: string;
  url: string;
  components: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  style?: object;
}
