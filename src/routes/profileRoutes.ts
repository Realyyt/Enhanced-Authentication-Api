// Purpose: Define routes for profile related operations.
import express from "express";
import {
    isAdmin,
    canAccessPrivateProfile,
} from "../middlewares/authmiddleware"; 
import {
    updateProfile,
    setProfilePrivacy,
} from "../controllers/profilecontroller";

const router = express.Router();


router.put("/profile", canAccessPrivateProfile, updateProfile);

router.put("/profile/privacy", isAdmin, setProfilePrivacy);
router.put("/profile/privacy", canAccessPrivateProfile, setProfilePrivacy);

export default router;
