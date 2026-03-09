import express from "express";
import * as dashboardController from "./analytics.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  verifyUser(["admin"]),
  dashboardController.getAdminDashboard
);

router.get(
  "/daily-attendance",
  verifyUser(["admin"]),
  dashboardController.getDailyAttendanceStats
);

/**
 * Student Performance Trend
 * Admin / Teacher / Student
 */

router.get(
  "/student-performance/:studentId",
  verifyUser(["admin", "teacher", "student"]),
  dashboardController.getStudentPerformanceTrend
);

// GET /api/analytics/exam/:examId
router.get(
  "/exam/:examId",
  verifyUser(["admin", "teacher", "student"]),
  dashboardController.getExamAnalyticsController
);


/**
 * GET STUDENT EXAM LIST
*/

/**
 * SUBJECT PERFORMANCE (EXAM)
 */

router.get(
  "/student/:studentId/exam/:examId",
  verifyUser(["admin", "teacher","student"]),
  dashboardController.getStudentExamSubjects
);

router.get(
  "/student/:studentId/exam-performance",
  verifyUser(["admin", "teacher", "student"]),
  dashboardController.getStudentExamPerformance
);




export default router;