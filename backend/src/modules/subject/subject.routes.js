import express from "express";
import * as subjectController from "./subject.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Admin only
router.post("/", verifyUser(["admin"]), subjectController.createSubject);
router.patch("/:id/assign", verifyUser(["admin"]), subjectController.assignTeacher);
router.delete("/:id", verifyUser(["admin"]), subjectController.deleteSubject);

// Admin & Teacher & Student
router.get("/", verifyUser(["admin", "teacher", "student"]), subjectController.getAllSubjects);
router.get("/:id", verifyUser(["admin", "teacher", "student"]), subjectController.getSubjectById);

export default router;