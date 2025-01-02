import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.LOCAL_CLIENT_URL,
    credentials: true,
  })
);

if (process.env.URI) {
  mongoose
    .connect(process.env.URI)
    .then(() => console.log("Successfully Connected to DB"))
    .catch((err) => console.error("Connection to DB failed", err));
} else {
  console.error("DB_URI environment variable is not defined");
}

app.get("/", (req: Request, res: Response): void => {
  res.status(200).send({ message: "Server is alive !" });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
