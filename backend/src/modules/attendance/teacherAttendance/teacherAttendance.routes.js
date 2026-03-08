import express from "express";
import * as teacherAttendanceController from "./teacherAttendace.controller.js";
import { verifyUser } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Teacher → Submit Attendance
 */
router.post(
  "/submit",
  verifyUser(["teacher"]),
  teacherAttendanceController.submitAttendance
);

/**
 * Teacher → Get My Attendance History
 */
router.get(
  "/me",
  verifyUser(["teacher"]),
  teacherAttendanceController.getMyAttendance
);

router.get(
  "/today",
  verifyUser(["teacher"]),
  teacherAttendanceController.getTodayAttendance
);

/**
 * Admin → Get Pending Attendance Requests
 */
router.get(
  "/pending",
  verifyUser(["admin"]),
  teacherAttendanceController.getPendingAttendance
);

/**
 * Admin → Get ALL Teachers Attendance History
 */
router.get(
  "/history",
  verifyUser(["admin"]),
  teacherAttendanceController.getAllTeacherAttendanceHistory
);

router.get(
  "/stats",
  verifyUser(["admin"]),
  teacherAttendanceController.getTeacherAttendanceStats
);



/**
 * Admin → Approve Attendance
 */
router.patch(
  "/:attendanceId/approve",
  verifyUser(["admin"]),
  teacherAttendanceController.approveAttendance
);

/**
 * Admin → Reject Attendance
 */
router.patch(
  "/:attendanceId/reject",
  verifyUser(["admin"]),
  teacherAttendanceController.rejectAttendance
);

/**
 * Admin → Get Single Teacher Attendance History
 */
router.get(
  "/teacher/:teacherId",
  verifyUser(["admin"]),
  teacherAttendanceController.getTeacherAttendanceHistoryById
);

export default router;