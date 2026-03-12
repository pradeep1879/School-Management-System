import express from "express";
import * as teacherController from "./teacher.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* Public */
router.post("/login", teacherController.loginTeacher);

/* Teacher Profile ,:id routes should put at end */
router.get("/profile", verifyUser(["teacher"]), teacherController.getProfile);
router.post("/logout", verifyUser(["teacher"]),  teacherController.logout);

/* Admin Routes */
router.post("/", verifyUser(["admin"]), teacherController.createTeacher);
router.get("/", verifyUser(["admin","teacher"]), teacherController.getAllTeachers);
router.get("/class",  verifyUser(["teacher"]), teacherController.getTeacherClass);
router.get("/:id", verifyUser(["admin"]), teacherController.getTeacherById);

export default router;