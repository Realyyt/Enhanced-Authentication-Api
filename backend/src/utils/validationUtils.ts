// purpose: to generate and verify jwt tokens

import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
