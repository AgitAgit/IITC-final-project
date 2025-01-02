import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId: string;
  user: { id: string };
}

export interface AuthenticatedRequestOptional extends Request {
  userId?: string;
}
