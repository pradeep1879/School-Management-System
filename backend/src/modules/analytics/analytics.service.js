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


export const getDashboardAnalytics = async () => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const [
    totalClasses,
    totalTeachers,
    totalStudents,
    teacherAttendance,
    studentAttendance,
  ] = await Promise.all([
    client.class.count(),

    client.teacher.count(),

    client.student.count(),

    // Teacher attendance grouped
    client.teacherAttendance.groupBy({
      by: ["status"],
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        approvalStatus: "APPROVED",
      },
      _count: {
        status: true,
      },
    }),

    // Student attendance grouped
    client.attendance.groupBy({
      by: ["status"],
      where: {
        session: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
      _count: {
        status: true,
      },
    }),
  ]);

  // Convert grouped results to object
  const teacherStats = {
    PRESENT: 0,
    ABSENT: 0,
  };

  teacherAttendance.forEach((t) => {
    teacherStats[t.status] = t._count.status;
  });

  const studentStats = {
    PRESENT: 0,
    ABSENT: 0,
    LEAVE: 0,
    HOLIDAY: 0,
  };

  studentAttendance.forEach((s) => {
    studentStats[s.status] = s._count.status;
  });

  const studentTotal =
    studentStats.PRESENT +
    studentStats.ABSENT +
    studentStats.LEAVE +
    studentStats.HOLIDAY;

  const teacherTotal =
    teacherStats.PRESENT +
    teacherStats.ABSENT;

  return {
    totalClasses,
    totalTeachers,
    totalStudents,

    presentStudents: studentStats.PRESENT,
    absentStudents: studentStats.ABSENT,
    leaveStudents: studentStats.LEAVE,
    holidayStudents: studentStats.HOLIDAY,

    presentTeachers: teacherStats.PRESENT,
    absentTeachers: teacherStats.ABSENT,

    studentAttendancePercent:
      studentTotal > 0
        ? Math.round((studentStats.PRESENT / studentTotal) * 100)
        : 0,

    teacherAttendancePercent:
      teacherTotal > 0
        ? Math.round((teacherStats.PRESENT / teacherTotal) * 100)
        : 0,
  };
};




const formatISTDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });
};

export const getDailyAttendanceStats = async (days = 7) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (days - 1));

  /* ---------- STUDENT PRESENT PER DAY ---------- */

  const studentDaily = await client.attendance.groupBy({
    by: ["sessionId"],
    where: {
      status: "PRESENT",
      session: {
        date: {
          gte: startDate,
          lte: today,
        },
      },
    },
    _count: {
      _all: true,
    },
  });

  const sessions = await client.attendanceSession.findMany({
    where: {
      date: {
        gte: startDate,
        lte: today,
      },
    },
    select: {
      id: true,
      date: true,
    },
  });

  const sessionDateMap = {};
  sessions.forEach((s) => {
    sessionDateMap[s.id] = formatISTDate(s.date);
  });

  const studentMap = {};

  studentDaily.forEach((item) => {
    const key = sessionDateMap[item.sessionId];

    if (!studentMap[key]) {
      studentMap[key] = 0;
    }

    studentMap[key] += item._count._all;
  });

  /* ---------- TEACHER PRESENT PER DAY ---------- */

  const teacherDaily = await client.teacherAttendance.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: startDate,
        lte: today,
      },
      status: "PRESENT",
      approvalStatus: "APPROVED",
    },
    _count: {
      _all: true,
    },
  });

  const teacherMap = {};

  teacherDaily.forEach((t) => {
    const key = formatISTDate(t.date);
    teacherMap[key] = t._count._all;
  });

  /* ---------- BUILD FINAL RESULT ---------- */

  const result = [];

 for (let i = 0; i < days; i++) {

  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i);

  const key = formatISTDate(date);

  result.push({
    date: key,
    studentsPresent: studentMap[key] || 0,
    teachersPresent: teacherMap[key] || 0
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



