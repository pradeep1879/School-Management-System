import express from "express";
import * as studentController from "./student.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyUser(["admin"]), studentController.createStudent);

router.post("/login", studentController.loginStudent);

router.get("/", verifyUser(["admin"]), studentController.getAllStudents);

router.get(
  "/class/:classId",
  verifyUser(["admin", "teacher"]),
  studentController.getStudentsByClass
);

router.get(
  "/profile",
  verifyUser(["student"]),
  studentController.getMyProfile
);

//  ADD THIS
router.get(
  "/my-class",
  verifyUser(["student"]),
  studentController.getMyClass
);

router.get(
  "/:studentId",
  verifyUser(["admin", "teacher"]),
  studentController.getStudentById
);

router.patch(
  "/profile",
  verifyUser(["student"]),
  studentController.updateMyProfile
);




export default router;