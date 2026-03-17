import express from "express";
import * as feeController from "./fee.controller.js";
import * as feeAnalytics from "./fee.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// this is only for admin
router.post(
  "/structure",
  verifyUser(["admin"]),
  feeController.createFeeStructure
);

router.post(
  "/component",
  verifyUser(["admin"]),
  feeController.addFeeComponent
);

router.post(
  "/generate-installments/:structureId",
  verifyUser(["admin"]),
  feeController.generateInstallmentsForStructure
);

router.post(
  "/collect",
  verifyUser(["admin"]),
  feeController.collectPayment
);

router.get(
  "/admin/summary",
  verifyUser(["admin"]),
  feeController.getAdminFinanceSummary
);

// dashboar analytics route

router.get(
  "/dashboard",
  verifyUser(["admin"]),
  feeAnalytics.getFinanceDashboard
);

router.get(
  "/student/:studentId",
  verifyUser(["admin"]),
  feeController.getStudentFeeSummary
);

router.get(
  "/class/:classId/summary",
  verifyUser(["admin"]),
  feeController.getClassFeeSummary
);


// this route is for student.         

router.get(
  "/my",
  verifyUser(["student"]),
  feeController.getMyFeeSummary
);

export default router;