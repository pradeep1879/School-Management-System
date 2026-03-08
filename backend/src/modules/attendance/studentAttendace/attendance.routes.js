import express from "express";
import * as attendanceController from "../studentAttendace/attendance.controller.js";
import { verifyUser } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Teacher → Mark Bulk Attendance
 */
router.post(
  "/bulk",
  verifyUser(["teacher"]),
  attendanceController.markAttendance
);

/**
 * Get Attendance by class & date
 */
router.get(
  "/class/:classId",
  verifyUser(["admin", "teacher"]),
  attendanceController.getAttendanceByDate
);

router.get(
  "/student/me",
  verifyUser(["student"]),
  attendanceController.getStudentAttendanceHistory
);

router.get(
  "/student/:studentId",
  verifyUser(["admin", "teacher"]),
  attendanceController.getStudentAttendanceById
);

router.get(
  "/class/:classId/summary",
  verifyUser(["admin", "teacher"]),
  attendanceController.getClassAttendanceSummary
);

/**
 * Update single student attendance
 */
router.put(
  "/session/:sessionId",
  verifyUser(["teacher"]),
  attendanceController.updateAttendanceSession
);
export default router;