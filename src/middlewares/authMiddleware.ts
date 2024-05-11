//purpose: Middleware functions for authentication and authorization
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

const getUser = async (req: Request): Promise<User | null> => {
    const userId = req.session?.userId;
    if (!userId) return null;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    return user;
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await getUser(req);

  if (!user || user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Unauthorized: Only admin users allowed" });
  }

  next();
};

export const canAccessPrivateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await getUser(req);
  const userId = req.params.userId;

  if (!user || (user.role !== "ADMIN" && user.id !== userId)) {
    return res.status(403).json({
      message:
        "Unauthorized: You do not have permission to access this profile",
    });
  }

  next();
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = (decodedToken as { userId: string }).userId;
    next();
  });
};
