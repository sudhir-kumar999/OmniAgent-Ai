import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { accessToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email: email.trim() });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = await User.create({
      name,
      email: email.trim(),
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Register Error:", error);
    return res.json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.json({
        success: false,
        message: "No user found. Please register.",
      });
    }
    console.log("Entered password:", password);
    console.log("Stored hashed:", user.password);

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = accessToken(user._id, process.env.JWT_SECRET);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);
    return res.json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.json({ success: true });
};

export const dashboard = (req, res) => {
  res.json({
    success: true,
    message: "Auth middleware works",
  });
};
