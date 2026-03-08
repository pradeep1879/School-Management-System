import express from "express";
import * as homeworkController from "./homework.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Teacher creates homework
router.post(
  "/",
  verifyUser(["teacher"]),
  homeworkController.createHomework
);

// Get homework by class (teacher & student)
router.get(
  "/class/:classId",
  verifyUser(["teacher", "student", "admin"]),
  homeworkController.getHomeworkByClass
);

// Update status (teacher only)
router.patch(
  "/:homeworkId/status",
  verifyUser(["teacher"]),
  homeworkController.updateHomeworkStatus
);

// Delete homework (teacher only)
router.delete(
  "/:homeworkId",
  verifyUser(["teacher"]),
  homeworkController.deleteHomework
);

export default router;