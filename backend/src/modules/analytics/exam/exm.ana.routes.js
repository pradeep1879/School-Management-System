import express from "express";
import { verifyUser } from "../../../middlewares/auth.middleware.js"
import * as examAnalyticsController from './exm.ana.controller.js'
const router = express.Router();




router.get(
  "/exam/:examId",
  verifyUser(["admin", "teacher"]),
  examAnalyticsController.getExamAnalytics
);




export default router;