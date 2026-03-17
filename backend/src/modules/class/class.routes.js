import express from "express";
import * as classController from "./class.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Admin creates class
router.post("/", verifyUser(["admin"]), classController.createClass);
router.patch("/:classId", verifyUser(["admin"]), classController.updateClass);
router.delete("/:classId", verifyUser(["admin"]),classController.deleteClass);

// Get all classes (admin)
router.get("/", verifyUser(["admin"]), classController.getAllClasses);

router.get("/dropdown", verifyUser(["admin"]),  classController.getClassDropdown);

// GET /api/v1/classes/:id
router.get("/:id", verifyUser(["admin"]), classController.getClassById);

export default router;