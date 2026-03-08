export interface DashboardAnalytics {
  totalClasses: number;
  totalTeachers: number;
  totalStudents: number;
  absentTeachers: number;
  leaveStudents:  number;
  holidayStudents: number,
  absentStudents: number;
  studentAttendancePercent: number;
  teacherAttendancePercent: number;
}



export interface DailyAttendance {
  date: string
  studentsPresent: number
  teachersPresent: number
}