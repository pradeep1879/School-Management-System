import { client } from "../../prisma/db.js";

// export const getDashboardAnalytics = async () => {
//   const today = new Date();

//   const startOfDay = new Date(today);
//   startOfDay.setHours(0, 0, 0, 0);

//   const endOfDay = new Date(today);
//   endOfDay.setHours(23, 59, 59, 999);

//   const [
//     totalClasses,
//     totalTeachers,
//     totalStudents,
//     teacherAttendance,
//     studentAttendance,
//   ] = await Promise.all([
//     client.class.count(),

//     client.teacher.count(),

//     client.student.count(),

//     client.teacherAttendance.findMany({
//       where: {
//         date: {
//           gte: startOfDay,
//           lte: endOfDay,
//         },
//         approvalStatus: "APPROVED",
//       },
//       select: {
//         teacherId: true,
//         status: true,
//       },
//       distinct: ["teacherId"],
//     }),

//     client.attendance.findMany({
//       where: {
//         session: {
//           date: {
//             gte: startOfDay,
//             lte: endOfDay,
//           },
//         },
//       },
//       select: {
//         studentId: true,
//         status: true,
//       },
//       distinct: ["studentId"],
//     }),
//   ]);

//   let presentTeachers = 0;
//   let absentTeachers = 0;

//   teacherAttendance.forEach((t) => {
//     if (t.status === "PRESENT") presentTeachers++;
//     if (t.status === "ABSENT") absentTeachers++;
//   });

//   let presentStudents = 0;
//   let absentStudents = 0;
//   let leaveStudents = 0;
//   let holidayStudents = 0;

//   studentAttendance.forEach((s) => {
//     if (s.status === "PRESENT") presentStudents++;
//     if (s.status === "ABSENT") absentStudents++;
//     if (s.status === "LEAVE") leaveStudents++;
//     if (s.status === "HOLIDAY") holidayStudents++;
//   });

//   const studentTotal =
//     presentStudents +
//     absentStudents +
//     leaveStudents +
//     holidayStudents;

//   const teacherTotal = presentTeachers + absentTeachers;

//   const studentAttendancePercent =
//     studentTotal > 0
//       ? Math.round((presentStudents / studentTotal) * 100)
//       : 0;

//   const teacherAttendancePercent =
//     teacherTotal > 0
//       ? Math.round((presentTeachers / teacherTotal) * 100)
//       : 0;

//   return {
//     totalClasses,
//     totalTeachers,
//     totalStudents,

//     presentStudents,
//     absentStudents,
//     leaveStudents,
//     holidayStudents,

//     presentTeachers,
//     absentTeachers,

//     studentAttendancePercent,
//     teacherAttendancePercent,
//   };
// };


// export const getDashboardAnalytics = async () => {
//   const today = new Date();

//   const startOfDay = new Date(today);
//   startOfDay.setHours(0, 0, 0, 0);

//   const endOfDay = new Date(today);
//   endOfDay.setHours(23, 59, 59, 999);

//   const [
//     totalClasses,
//     totalTeachers,
//     totalStudents,
//     teacherAttendance,
//     sessions
//   ] = await Promise.all([
//     client.class.count(),
//     client.teacher.count(),
//     client.student.count(),

//     client.teacherAttendance.findMany({
//       where: {
//         date: {
//           gte: startOfDay,
//           lte: endOfDay,
//         },
//         approvalStatus: "APPROVED",
//       },
//       select: { status: true },
//     }),

//     client.attendanceSession.findMany({
//       where: {
//         date: {
//           gte: startOfDay,
//           lte: endOfDay,
//         },
//       },
//       select: {
//         records: {
//           select: {
//             studentId: true,
//             status: true,
//           },
//         },
//       },
//     }),
//   ]);

//   /* ---------- STUDENT STATS ---------- */

//   const studentStats = {
//     PRESENT: 0,
//     ABSENT: 0,
//     LEAVE: 0,
//     HOLIDAY: 0,
//   };

//   const countedStudents = new Set();

//   for (const session of sessions) {
//     for (const record of session.records) {

//       if (countedStudents.has(record.studentId)) continue;

//       countedStudents.add(record.studentId);
//       studentStats[record.status]++;
//     }
//   }

//   /* ---------- TEACHER STATS ---------- */

//   const teacherStats = {
//     PRESENT: 0,
//     ABSENT: 0,
//     LEAVE: 0,
//     HALF_DAY: 0,
//     HOLIDAY: 0,
//   };

//   teacherAttendance.forEach((t) => {
//     teacherStats[t.status]++;
//   });

//   /* ---------- PERCENTAGES ---------- */

//   const studentAttendancePercent =
//     totalStudents > 0
//       ? Math.round((studentStats.PRESENT / totalStudents) * 100)
//       : 0;

//   const teacherAttendancePercent =
//     totalTeachers > 0
//       ? Math.round((teacherStats.PRESENT / totalTeachers) * 100)
//       : 0;

//   return {
//     totalClasses,
//     totalTeachers,
//     totalStudents,

//     presentStudents: studentStats.PRESENT,
//     absentStudents: studentStats.ABSENT,
//     leaveStudents: studentStats.LEAVE,
//     holidayStudents: studentStats.HOLIDAY,

//     presentTeachers: teacherStats.PRESENT,
//     absentTeachers: teacherStats.ABSENT,
//     leaveTeachers: teacherStats.LEAVE,
//     halfDayTeachers: teacherStats.HALF_DAY,

//     studentAttendancePercent,
//     teacherAttendancePercent,
//   };
// };




export const getAdminDashboard = async () => {

  const today = new Date()

  const startOfDay = new Date(today)
  startOfDay.setHours(0,0,0,0)

  const endOfDay = new Date(today)
  endOfDay.setHours(23,59,59,999)

  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - 6)
  startOfWeek.setHours(0,0,0,0)

  const [
    totalClasses,
    totalStudents,
    totalTeachers,

    classesWithAttendance,

    studentToday,
    teacherToday,

    weeklyStudents,
    weeklyTeachers

  ] = await Promise.all([

    client.class.count(),

    client.student.count(),

    client.teacher.count(),

    /* Classes that marked attendance today */

    client.attendanceSession.findMany({
      where:{
        date:{
          gte:startOfDay,
          lte:endOfDay
        }
      },
      select:{
        classId:true
      }
    }),

    /* Student attendance today */

    client.attendance.findMany({
      where:{
        session:{
          date:{
            gte:startOfDay,
            lte:endOfDay
          }
        }
      },
      select:{
        studentId:true,
        status:true
      }
    }),

    /* Teacher attendance today */

    client.teacherAttendance.findMany({
      where:{
        approvalStatus:"APPROVED",
        date:{
          gte:startOfDay,
          lte:endOfDay
        }
      },
      select:{
        status:true
      }
    }),

    /* Weekly student chart */

    client.$queryRaw`
      SELECT DATE(s.date) as date,
             COUNT(a.id)::int as present
      FROM "Attendance" a
      JOIN "AttendanceSession" s
      ON a."sessionId" = s.id
      WHERE a.status = 'PRESENT'
      AND s.date BETWEEN ${startOfWeek} AND ${endOfDay}
      GROUP BY DATE(s.date)
      ORDER BY DATE(s.date)
    `,

    /* Weekly teacher chart */

    client.$queryRaw`
      SELECT DATE(date) as date,
             COUNT(id)::int as present
      FROM "TeacherAttendance"
      WHERE status='PRESENT'
      AND "approvalStatus"='APPROVED'
      AND date BETWEEN ${startOfWeek} AND ${endOfDay}
      GROUP BY DATE(date)
      ORDER BY DATE(date)
    `
  ])

  /* ---------- STUDENT STATS ---------- */

  const studentStats = {
    PRESENT:0,
    ABSENT:0,
    LEAVE:0,
    HOLIDAY:0
  }

  for(const record of studentToday){

    if(studentStats[record.status] !== undefined){
      studentStats[record.status]++
    }

  }

  /* ---------- TEACHER STATS ---------- */

  const teacherStats = {
    PRESENT:0,
    ABSENT:0,
    LEAVE:0,
    HALF_DAY:0,
    HOLIDAY:0
  }

  for(const t of teacherToday){

    if(teacherStats[t.status] !== undefined){
      teacherStats[t.status]++
    }

  }

  /* ---------- MISSING ATTENDANCE ---------- */

  const classesMarked = new Set(classesWithAttendance.map(c=>c.classId))

  const allClasses = await client.class.findMany({
    select:{ id:true }
  })

  const pendingClasses = allClasses.filter(
    c => !classesMarked.has(c.id)
  ).length

  /* ---------- WEEKLY CHART ---------- */

  const studentMap = {}
  const teacherMap = {}

  for(const row of weeklyStudents){
    studentMap[formatISTDate(row.date)] = Number(row.present)
  }

  for(const row of weeklyTeachers){
    teacherMap[formatISTDate(row.date)] = Number(row.present)
  }

  const weeklyChart = []

  for(let i=0;i<7;i++){

    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate()+i)

    const key = formatISTDate(date)

    weeklyChart.push({
      date:key,
      studentsPresent: studentMap[key] || 0,
      teachersPresent: teacherMap[key] || 0
    })

  }

  return {

    overview:{
      totalClasses,
      totalStudents,
      totalTeachers
    },

    todayAttendance:{
      students:studentStats,
      teachers:teacherStats
    },

    attendanceStatus:{
      classesMarked: classesMarked.size,
      pendingClasses
    },

    charts:{
      weeklyAttendance: weeklyChart
    }

  }

}

const formatISTDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });
};

export const getDailyAttendanceStats = async (days = 7) => {

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setDate(endDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  const [studentStats, teacherStats] = await Promise.all([

    client.$queryRaw`
      SELECT DATE(s.date) as date,
             COUNT(a.id) as studentsPresent
      FROM "Attendance" a
      JOIN "AttendanceSession" s
      ON a."sessionId" = s.id
      WHERE a.status = 'PRESENT'
      AND s.date BETWEEN ${startDate} AND ${endDate}
      GROUP BY DATE(s.date)
      ORDER BY DATE(s.date)
    `,

    client.$queryRaw`
      SELECT DATE(date) as date,
             COUNT(id) as teachersPresent
      FROM "TeacherAttendance"
      WHERE status = 'PRESENT'
      AND "approvalStatus" = 'APPROVED'
      AND date BETWEEN ${startDate} AND ${endDate}
      GROUP BY DATE(date)
      ORDER BY DATE(date)
    `
  ]);

  const studentMap = {};
  const teacherMap = {};

  for (const s of studentStats) {
    studentMap[formatISTDate(s.date)] = Number(s.studentspresent);
  }

  for (const t of teacherStats) {
    teacherMap[formatISTDate(t.date)] = Number(t.teacherspresent);
  }

  const result = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const key = formatISTDate(date);

    result.push({
      date: key,
      studentsPresent: studentMap[key] || 0,
      teachersPresent: teacherMap[key] || 0,
    });
  }

  return result;
};



export const getStudentPerformanceTrend = async (studentId) => {

  if (!studentId) {
    throw new Error("Student ID is required");
  }

  const results = await client.examResult.findMany({
    where: {
      studentId,
      examSubject: {
        exam: {
          status: "PUBLISHED"
        }
      }
    },
    include: {
      examSubject: {
        include: {
          exam: {
            select: {
              id: true,
              title: true,
              createdAt: true
            }
          }
        }
      }
    }
  });

  if (!results.length) {
    return { performance: [] };
  }

  const examMap = {};

  for (const result of results) {

    const exam = result.examSubject.exam;
    const examId = exam.id;

    if (!examMap[examId]) {
      examMap[examId] = {
        examId: exam.id,
        examTitle: exam.title,
        obtained: 0,
        total: 0,
        createdAt: exam.createdAt
      };
    }

    examMap[examId].obtained += result.obtainedMarks || 0;
    examMap[examId].total += result.examSubject.totalMarks;
  }

  const performance = Object.values(examMap)
    .map((exam) => ({
      examId: exam.examId,
      examTitle: exam.examTitle,
      percentage:
        exam.total > 0
          ? Number(((exam.obtained / exam.total) * 100).toFixed(2))
          : 0,
      createdAt: exam.createdAt
    }))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return {
    studentId,
    performance
  };
};



export const getStudentExamPerformance = async (studentId) => {

  if (!studentId) {
    throw new Error("Student ID required");
  }

  const student = await client.student.findUnique({
    where: { id: studentId },
    select: { classId: true }
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const exams = await client.exam.findMany({
    where: {
      classId: student.classId,
      status: "PUBLISHED"
    },
    select: {
      id: true,
      title: true,
      startDate: true
    },
    orderBy: {
      startDate: "desc"
    }
  });

  if (!exams.length) {
    return { exams: [], subjects: [] };
  }

  const defaultExam = exams[0];

  const examSubjects = await client.examSubject.findMany({
    where: {
      examId: defaultExam.id
    },
    include: {
      subject: true,
      results: {
        where: { studentId }
      }
    }
  });

  const subjects = examSubjects.map((s) => {

    const obtained = s.results[0]?.obtainedMarks || 0;

    return {
      subjectName: s.subject.name,
      totalMarks: s.totalMarks,
      passingMarks: s.passingMarks,
      obtainedMarks: obtained,
      status: obtained >= s.passingMarks ? "PASS" : "FAIL"
    };

  });

  return {
    studentId,
    exams,
    defaultExamId: defaultExam.id,
    subjects
  };
};

export const getStudentExamSubjects = async (studentId, examId) => {

  const examSubjects = await client.examSubject.findMany({
    where: { examId },
    include: {
      subject: true,
      results: {
        where: { studentId }
      }
    }
  });

  const subjects = examSubjects.map((s) => {

    const obtained = s.results[0]?.obtainedMarks || 0;

    return {
      subjectName: s.subject.name,
      totalMarks: s.totalMarks,
      passingMarks: s.passingMarks,
      obtainedMarks: obtained,
      status: obtained >= s.passingMarks ? "PASS" : "FAIL"
    };

  });

  return { subjects };
};



