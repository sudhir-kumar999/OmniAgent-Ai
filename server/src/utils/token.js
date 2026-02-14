import jwt from "jsonwebtoken";

export const accessToken = (userId, secret) => {
  // console.log({id:userId},secret)
  return jwt.sign({ id: userId }, secret);
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
