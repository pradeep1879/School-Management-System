import express from "express";
import * as syllabusController from "./syllabus.controller.js";
import { verifyUser } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// Admin + Teacher

router.post(
  "/bulk",
  verifyUser(["admin", "teacher"]),
  syllabusController.createChaptersBulk
);

router.post(
  "/",
  verifyUser(["admin", "teacher"]),
  syllabusController.createChapter
);

router.patch(
  "/:chapterId/status",
  verifyUser(["admin", "teacher"]),
  syllabusController.updateChapterStatus
);

router.delete(
  "/:chapterId",
  verifyUser(["admin", "teacher"]),
  syllabusController.deleteChapter
);

// Everyone can view
router.get(
  "/subject/:subjectId",
  verifyUser(["admin", "teacher", "student"]),
  syllabusController.getChaptersBySubject
);

export default router;