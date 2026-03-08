import express from "express";
import * as examController from "./exam.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= CREATE ================= */

// Admin + Teacher
router.post(
  "/",
  verifyUser(["admin", "teacher"]),
  examController.createExam
);

/* ================= FETCH ================= */

// Get exams by class
router.get(
  "/",
  verifyUser(["admin", "teacher", "student"]),
  examController.getExamsByClass
);

// Student exam summary
router.get(
  "/summary",
  verifyUser(["admin", "teacher", "student"]),
  examController.getStudentExamSummary
);

// Get exam results overview (teacher/admin)
router.get(
  "/:examId/results",
  verifyUser(["admin", "teacher"]),
  examController.getExamResultsOverview
);

// Get detailed student result
router.get(
  "/:examId/result/:studentId",
  verifyUser(["admin", "teacher", "student"]),
  examController.getStudentDetailedResult
);

/* ================= MARKS ================= */

// Get subject results (for marks entry)
router.get(
  "/:examId/subject/:subjectId/results",
  verifyUser(["admin", "teacher"]),
  examController.getSubjectResults
);

// Bulk update marks
router.patch(
  "/bulk-marks",
  verifyUser(["admin", "teacher"]),
  examController.bulkUpdateMarks
);

// Update single result marks
router.patch(
  "/result/:id",
  verifyUser(["admin", "teacher"]),
  examController.updateExamMarks
);

/* ================= STATUS ================= */

// Publish exam
router.patch(
  "/:id/publish",
  verifyUser(["admin", "teacher"]),
  examController.publishExam
);

// Update exam status
router.patch(
  "/:id/status",
  verifyUser(["admin", "teacher"]),
  examController.updateExamStatus
);

export default router;