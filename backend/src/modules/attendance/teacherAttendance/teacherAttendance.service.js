import { client } from "../../../prisma/db.js";
import { getISTDate, getISTNow, getISTStartOfDay } from "../../../utils/date.js";


/**
 * TEACHER SUBMIT ATTENDANCE
 */

export const submitTeacherAttendance = async (body, teacherId) => {

  const { status, note } = body;

  const allowedStatuses = [
    "PRESENT",
    "ABSENT",
    "LEAVE",
    "HALF_DAY",
    "HOLIDAY"
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid attendance status");
  }

  const attendanceDate = new Date(getISTDate());

  /* ---------- CHECK IF ALREADY SUBMITTED ---------- */

  const existingAttendance = await client.teacherAttendance.findUnique({
    where: {
      teacherId_date: {
        teacherId,
        date: attendanceDate
      }
    }
  });

  if (existingAttendance) {
    throw new Error("Attendance already submitted for today");
  }

  /* ---------- CREATE ATTENDANCE ---------- */

  const attendance = await client.teacherAttendance.create({
    data: {
      teacherId,
      date: attendanceDate,
      status,
      note,
      submittedById: teacherId
    }
  });

  return {
    message: "Attendance submitted successfully",
    attendance
  };
};


export const getTodayAttendance = async (teacherId) => {

  const today = new Date(getISTDate())
  console.log("get today attendance", today)

  return client.teacherAttendance.findUnique({
    where: {
      teacherId_date: {
        teacherId,
        date: today
      }
    },
    select: {
      id: true,
      status: true,
      approvalStatus: true,
      rejectionReason: true,
      date: true
    }
  })
}
/**
 * TEACHER GET OWN ATTENDANCE
 */

export const getMyTeacherAttendance = async (teacherId) => {
  const attendance = await client.teacherAttendance.findMany({
    where: {
      teacherId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return attendance;
};



export const getAllTeacherAttendanceHistory = async () => {
  return client.teacherAttendance.findMany({
    include: {
      teacher: {
        select: {
          id: true,
          teacherName: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 100
  });
};



export const getTeacherAttendanceStats = async () => {

  const teachers = await client.teacher.findMany({
    select: {
      id: true,
      teacherName: true
    }
  });

  const attendanceCounts = await client.teacherAttendance.groupBy({
    by: ["teacherId", "status"],
    _count: {
      status: true
    }
  });

  const map = {};

  attendanceCounts.forEach((a) => {

    if (!map[a.teacherId]) {
      map[a.teacherId] = {
        PRESENT: 0,
        ABSENT: 0,
        LEAVE: 0,
        HALF_DAY: 0
      };
    }

    map[a.teacherId][a.status] = a._count.status;

  });

  return teachers.map((teacher) => {

    const stats = map[teacher.id] || {
      PRESENT: 0,
      ABSENT: 0,
      LEAVE: 0,
      HALF_DAY: 0
    };

    const total =
      stats.PRESENT +
      stats.ABSENT +
      stats.LEAVE +
      stats.HALF_DAY;

    const attendancePercent = total
      ? Math.round((stats.PRESENT / total) * 100)
      : 0;

    return {
      teacherId: teacher.id,
      teacherName: teacher.teacherName,
      present: stats.PRESENT,
      absent: stats.ABSENT,
      leave: stats.LEAVE,
      halfDay: stats.HALF_DAY,
      attendancePercent
    };

  });

};

/**
 * ADMIN GET PENDING ATTENDANCE
 */

export const getPendingTeacherAttendance = async () => {
  return client.teacherAttendance.findMany({
    where: {
      approvalStatus: "PENDING",
    },
    select: {
      id: true,
      status: true,
      date: true,
      note: true,
      submittedAt: true,
      teacher: {
        select: {
          id: true,
          teacherName: true,
          email: true,
        },
      },
    },
    orderBy: {
      submittedAt: "desc",
    },
  });
};
/**
 * ADMIN APPROVE ATTENDANCE
 */

export const approveTeacherAttendance = async (attendanceId, adminId) => {

  const attendance = await client.teacherAttendance.updateMany({
    where: {
      id: attendanceId,
      approvalStatus: "PENDING"
    },
    data: {
      approvalStatus: "APPROVED",
      verifiedBy: adminId,
      verifiedAt: getISTNow()
    }
  })
  console.log("approve teacher attendace", getISTNow())
  if (attendance.count === 0) {
    throw new Error("Attendance not found or already processed")
  }

  return {
    message: "Attendance approved successfully"
  }
}

/**
 * ADMIN REJECT ATTENDANCE
 */

export const rejectTeacherAttendance = async (
  attendanceId,
  adminId,
  reason
) => {

  const attendance = await client.teacherAttendance.updateMany({
    where: {
      id: attendanceId,
      approvalStatus: "PENDING"
    },
    data: {
      approvalStatus: "REJECTED",
      verifiedBy: adminId,
      verifiedAt: getISTNow(),
      rejectionReason: reason
    }
  })

  if (attendance.count === 0) {
    throw new Error("Attendance not found or already processed")
  }

  return {
    message: "Attendance rejected successfully"
  }
}

/**
 * ADMIN GET TEACHER ATTENDANCE HISTORY
 */

export const getTeacherAttendanceHistoryById = async (teacherId) => {
  return client.teacherAttendance.findMany({
    where: {
      teacherId,
    },
    orderBy: {
      date: "desc",
    },
    take: 50
  });
};;