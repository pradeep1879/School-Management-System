import { client } from "../../prisma/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import config from "../../config/env.js";
import  { imagekit }  from "../../config/imagekit.js";
import config from "../../../config.js";



export const signup = async ({ name, email, password }) => {
  const existingAdmin = await client.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await client.admin.create({
    data: { name, email, password: hashedPassword },
  });

  const { password: _, ...safeAdmin } = admin;

  return {
    message: "Admin created successfully",
    sucess: true,
    admin: safeAdmin,
  };
};


export const login = async ({ email, password }) => {
  const admin = await client.admin.findUnique({
    where: { email },
  });

  if (!admin) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: admin.id, role: "admin" }, config.JWT_SECRET,{ expiresIn: "1d" });

  const { password: _, ...safeAdmin } = admin;

  return {
    message: "Admin logged in successfully",
    sucess:true,
    token,
    admin: safeAdmin,
  };
};

export const logout = async (adminId) => {
  return {
    success: true,
    message: "Admin logged out successfully",
  };
};

export const getProfile = async (adminId) => {
  const admin = await client.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  return {
    message: "Profile fetched successfully",
    admin,
  };
};



export const getDashboardData = async (adminId) => {
  console.log("hi there from get dashboard data");
  const [
    totalClasses,
    totalTeachers,
    totalStudents,
    monthlyRevenue,
  ] = await Promise.all([
    client.class.count({ where: { adminId } }),
    client.teacher.count({ where: { adminId } }),
    client.student.count(),
    // client.fee.groupBy({
    //   by: ["month"],
    //   _sum: { amount: true },
    // }),
  ]);

  return {
    stats: {
      totalClasses,
      totalTeachers,
      totalStudents,
    },
    graphs: {
      monthlyRevenue,
    },
  };
};






