import { Request } from "express";
import { IUser } from "./userTypes";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
export interface AuthenticatedRequestOptional extends Request {
  userId?: string;
}
