// Code to handle profile updation and privacy settings
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { name, bio, phone, email, photo } = req.body;

    const updatedProfile = await prisma.user.update({
        where: { id: userId },
        data: {
            ...req.body
        },
    });

    res
        .status(200)
        .json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
  } catch (error) {
    next(error);
  }
};

export const setProfilePrivacy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { isPublic } = req.body;

    const updatedProfile = await prisma.user.update({
        where: { id: userId },
        data: { isPublic },
    });

    res
        .status(200)
        .json({
            message: "Profile privacy updated successfully",
            profile: updatedProfile,
        });
  } catch (error) {
    next(error);
  }
};
