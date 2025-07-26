import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.mjs";
import { protectRoute } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
