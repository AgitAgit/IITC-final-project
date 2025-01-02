import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/userModel";
import { IUser } from "../types/userTypes";
import { AuthenticatedRequest } from "../types/expressTypes";
import Joi from "joi";

export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }

    const user: IUser | null = await User.findById(userId)
      .select("-password")
      .populate({
        path: "sites",
        populate: {
          path: "owner",
          select: "username email",
        },
      });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already registered." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      role: newUser.role,
    };

    // Send cookie with token
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
    console.log("user created sucessefully", userResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "3h",
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role,
    };

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful", userResponse });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const {
      username,
      email,
      password,
      googleId,
      profileImage,
      role,
      sites,
    }: IUser = req.body;

    // חיפוש המשתמש לפי ID
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // עדכון הסיסמה אם נמסרה
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (googleId) user.googleId = googleId;
    if (profileImage) user.profileImage = profileImage;
    if (role) user.role = role;
    if (sites) user.sites = sites;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user._id.toString() !== req.user?.id) {
      res.status(403).json({ message: "You can't delete another user." });
      return;
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
