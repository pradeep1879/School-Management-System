import express from "express";
import * as feeController from "./fee.controller.js";
import * as feeAnalytics from "./fee.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= ADMIN ================= */

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

/* 🔥 NEW DASHBOARD ANALYTICS ROUTE */

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


/* ================= STUDENT ================= */

router.get(
  "/my",
  verifyUser(["student"]),
  feeController.getMyFeeSummary
);

export default router;