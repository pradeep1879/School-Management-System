import { client } from "../../../prisma/db.js";

/**
 * TEACHER SUBMIT ATTENDANCE
 */

export const submitTeacherAttendance = async (body, teacherId) => {
  const { status, note } = body;

  if (!status) {
    throw new Error("Attendance status is required");
  }

  const allowedStatuses = [
    "PRESENT",
    "ABSENT",
    "LEAVE",
    "HALF_DAY",
    "HOLIDAY",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid attendance status");
  }

  const attendanceDate = new Date();
  attendanceDate.setHours(0, 0, 0, 0);

  try {
    const attendance = await client.teacherAttendance.create({
      data: {
        teacherId,
        date: attendanceDate,
        status,
        note,
        submittedById: teacherId,
      },
    });

    return {
      message: "Attendance submitted successfully",
      attendance,
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Attendance already submitted for today");
    }

    throw error;
  }
};



export const getTodayAttendance = async (teacherId) => {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const attendance = await client.teacherAttendance.findFirst({
    where: {
      teacherId,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
    select: {
      id: true,
      status: true,
      approvalStatus: true,
      rejectionReason: true,
      date: true,
    },
  });

  return attendance;
};

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
  });
};

export const getTeacherAttendanceStats = async () => {
  const teachers = await client.teacher.findMany({
    select: {
      id: true,
      teacherName: true,
      attendances: {
        select: {
          status: true,
        },
      },
    },
  });

  const stats = teachers.map((teacher) => {
    const records = teacher.attendances;

    let present = 0;
    let absent = 0;
    let leave = 0;
    let halfDay = 0;

    records.forEach((r) => {
      if (r.status === "PRESENT") present++;
      if (r.status === "ABSENT") absent++;
      if (r.status === "LEAVE") leave++;
      if (r.status === "HALF_DAY") halfDay++;
    });

    const total = present + absent + leave + halfDay;

    const attendancePercent = total
      ? Math.round((present / total) * 100)
      : 0;

    return {
      teacherId: teacher.id,
      teacherName: teacher.teacherName,
      present,
      absent,
      leave,
      halfDay,
      attendancePercent,
    };
  });

  return stats;
};

/**
 * ADMIN GET PENDING ATTENDANCE
 */

export const getPendingTeacherAttendance = async () => {
  const pendingAttendance = await client.teacherAttendance.findMany({
    where: {
      approvalStatus: "PENDING",
    },
    include: {
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

  return pendingAttendance;
};

/**
 * ADMIN APPROVE ATTENDANCE
 */

export const approveTeacherAttendance = async (attendanceId, adminId) => {
  const attendance = await client.teacherAttendance.findUnique({
    where: { id: attendanceId },
  });

  if (!attendance) {
    throw new Error("Attendance not found");
  }

  if (attendance.approvalStatus !== "PENDING") {
    throw new Error("Attendance already processed");
  }

  const updatedAttendance = await client.teacherAttendance.update({
    where: { id: attendanceId },
    data: {
      approvalStatus: "APPROVED",
      verifiedBy: adminId,
      verifiedAt: new Date(),
    },
  });

  return {
    message: "Attendance approved successfully",
    attendance: updatedAttendance,
  };
};

/**
 * ADMIN REJECT ATTENDANCE
 */

export const rejectTeacherAttendance = async (
  attendanceId,
  adminId,
  reason
) => {
  const attendance = await client.teacherAttendance.findUnique({
    where: { id: attendanceId },
  });

  if (!attendance) {
    throw new Error("Attendance not found");
  }

  if (attendance.approvalStatus !== "PENDING") {
    throw new Error("Attendance already processed");
  }

  const updatedAttendance = await client.teacherAttendance.update({
    where: { id: attendanceId },
    data: {
      approvalStatus: "REJECTED",
      verifiedBy: adminId,
      verifiedAt: new Date(),
      rejectionReason: reason,
    },
  });

  return {
    message: "Attendance rejected",
    attendance: updatedAttendance,
  };
};

/**
 * ADMIN GET TEACHER ATTENDANCE HISTORY
 */

export const getTeacherAttendanceHistoryById = async (teacherId) => {
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