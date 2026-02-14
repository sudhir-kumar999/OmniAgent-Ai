import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { accessToken } from "../utils/token.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      success: false,
      message: "user Already exist please login",
    });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser =
    (await User.create({
      name,
      email,
      password: hashed,
    })) - "password";
  if (!newUser) {
    return res.json({
      success: false,
      message: "user saving error occurred",
    });
  }
  return res.json({
    success: true,
    message: "user registered successfully",
    data: newUser,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      message: "No user found plz register",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({
      success: false,
      message: "wrong password",
    });
  }
  const secret=process.env.JWT_SECRET;
  const token=accessToken(user._id,secret)
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: false,   // production me true (https)
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  return res.json({
    success:true,
    message:"login successful"
  })
};


export const dashboard=(req,res)=>{
    res.send("authmiddlware works")
}