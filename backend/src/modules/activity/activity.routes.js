import express from "express";
import * as activityController from "./activity.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Create (admin + teacher)
router.post("/",  verifyUser(["admin", "teacher"]), activityController.createActivity);

// Get by class
router.get("/", verifyUser(["admin", "teacher", "student"]),  activityController.getActivitiesByClass);

// Get single
router.get("/:id",  verifyUser(["admin", "teacher", "student"]),  activityController.getActivityById);

// Update status (admin + teacher only)
router.patch("/:id/status", verifyUser(["admin", "teacher"]), activityController.updateActivityStatus);

export default router;