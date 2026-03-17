import express from "express";
import * as adminController from "./admin.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();


// Public Routes


// Admin signup
router.post("/signup", adminController.signup);

// Admin login
router.post("/login", adminController.login);

router.post("/logout", adminController.logout);


// Protected Routes

// Admin dashboard
router.get("/dashboard", verifyUser(["admin"]), adminController.dashboard);

// Admin profile (optional but recommended)
router.get("/profile", verifyUser(["admin"]), adminController.getProfile);

router.patch("/profile", verifyUser(["admin"]), adminController.updateMyProfile);


export default router;