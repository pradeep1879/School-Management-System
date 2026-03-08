import { client } from "../../prisma/db.js";

export const createClass = async (body, adminId) => {
  const { slug, section, session, teacherId } = body;

  // Duplicate check
  const existingClass = await client.class.findFirst({
    where: { slug, section, session, adminId },
  });

  if (existingClass) {
    throw new Error("Class already exists");
  }

  const newClass = await client.class.create({
    data: {
      slug,
      section,
      session,
      teacherId: teacherId || null,
      adminId,
    },
  });

  return {
    message: "Class created successfully",
    newClass,
  };
};

export const getAllClasses = async (query, adminId) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  const [classes, total] = await Promise.all([
    client.class.findMany({
      where: {
        adminId, //  only admin's classes
      },
      skip,
      take: limit,
      select: {
        id: true,
        slug: true,
        section: true,
        session: true,
        teacher: {
          select: {
            id: true,
            teacherName: true,
          },
        },
        _count: {
          select: { students: true }, //  count students instead of full data
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    client.class.count({
      where: { adminId },
    }),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    classes,
  };
};

export const getClassDropdown = async (adminId) => {
  const classes = await client.class.findMany({
    where: {
      adminId,
    },
    select: {
      id: true,
      slug: true,
      section: true,
      session: true,
    },
    orderBy: {
      slug: "asc",
    },
  });

  return {
    message: "Class dropdown fetched successfully",
    classes,
  };
};

export const getClassById = async (classId, adminId) => {
  //  Check if class exists and belongs to admin
  const existingClass = await client.class.findFirst({
    where: {
      id: classId,
      adminId,
    },
  });

  if (!existingClass) {
    throw new Error("Class not found or unauthorized");
  }

  //  Fetch full detail
  const classDetail = await client.class.findUnique({
    where: { id: classId },
    select: {
      id: true,
      slug: true,
      section: true,
      session: true,
      teacher: {
        select: {
          id: true,
          teacherName: true,
          email: true,
          imageUrl: true,
        },
      },
      subjects: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          students: true,
          subjects: true
        },
      },
      students: {
        select: {
          id: true,
          studentName: true,
          rollNumber: true,
          imageUrl: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    message: "Class detail fetched successfully",
    classDetail,
  };
};
