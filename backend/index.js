console.log("hi there from index.js")
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import adminRoutes from '../backend/src/modules/admin/admin.routes.js'
// import studentRoute from '../backend/src/routes/student.routes.js'
import teacherRoutes from "../backend/src/modules/teacher/teacher.routes.js";
import classRoutes from "./src/modules/class/class.routes.js";
import studentRoutes from "./src/modules/student/student.routes.js";
import subjectRoutes from "./src/modules/subject/subject.routes.js";
import syllabusRoutes from "./src/modules/subject/syllabus/syllabus.routes.js";
import activityRoutes from "./src/modules/activity/activity.routes.js";
import examRoutes from "./src/modules/exam/exam.routes.js";
import homeWorkRoutes from "./src/modules/homeWork/homework.routes.js";
import { globalErrorHandler } from "./src/middlewares/error.middleware.js";
import attendanceRoutes from "./src/modules/attendance/studentAttendace/attendance.routes.js";
import feeRoutes from "./src/modules/fee/fee.routes.js";
import teacherAttendanceRoutes from './src/modules/attendance/teacherAttendance/teacherAttendance.routes.js'
import teacherSalaryRoutes from "./src/modules/salary/salary.routes.js";
import analyticsRoutes from "./src/modules/analytics/analytics.routes.js"
import examAnalyticsRoutes from "./src/modules/analytics/exam/exm.ana.routes.js"

import { startTeacherAttendanceCron } from "./src/modules/attendance/teacherAttendance/teacherAttendance.cron.js";


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get('/',(req,res) =>{
    res.send('hi there')
});
// app.use('/api/v1/student', studentRoute)
app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/teacher/attendance", teacherAttendanceRoutes);
app.use("/api/v1/teacher/salary", teacherSalaryRoutes);

app.use("/api/v1/teacher", teacherRoutes);

app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/syllabus", syllabusRoutes);
app.use("/api/v1/activity", activityRoutes);
app.use("/api/v1/exam", examRoutes);
app.use("/api/v1/exam/analytics", examAnalyticsRoutes);
app.use("/api/v1/homework", homeWorkRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/fees", feeRoutes);
app.use("/api/v1/analytics", analyticsRoutes);


app.use(globalErrorHandler);

app.listen(process.env.PORT, () =>{
  startTeacherAttendanceCron();
  console.log(process.env.PORT);
})








