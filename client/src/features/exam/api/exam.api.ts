// import api from "@/api/axios";


// export const getExams = async (classId: string) => {
//   const res = await api.get(`/exam?classId=${classId}`);
//   return res.data;
// };

// export const createExam = async (payload: any) => {
//   const res = await api.post("/exam", payload);
//   return res.data;
// };

// export const getSubjectResults = async (
//   examId: string,
//   subjectId: string
// ) => {
//   const res = await api.get(
//     `/exam/${examId}/subject/${subjectId}/results`
//   );
//   console.log("console from getSubject result", res.data)
//   return res.data;
// };

// export const bulkUpdateMarks = async (updates: any[]) => {
//   const res = await api.patch("/exam/bulk-marks", {
//     updates,
//   });
//   return res.data;
// };

// export const publishExam = async (examId: string) => {
//   const res = await api.patch(`/exam/${examId}/publish`);
//   return res.data;
// };

// export const getStudentExamSummary = async (
//   examId: string,
//   studentId: string
// ) => {
//   const res = await api.get(
//     `/exam/summary?examId=${examId}&studentId=${studentId}`
//   );
//   return res.data;
// };



// export const getExamResultsOverview = async (examId: string) => {
//   const res = await api.get(`/exam/${examId}/results`);
//   return res.data;
// };

// export const getStudentDetailedResult = async (
//   examId: string,
//   studentId: string
// ) => {
//   const res = await api.get(
//     `/exam/${examId}/result/${studentId}`
//   );
//   return res.data;
// };







import api from "@/api/axios";

export const getExams = async (classId: string) => {
  const res = await api.get(`/exam?classId=${classId}`);
  return res.data;
};

export const createExam = async (payload: any) => {
  const res = await api.post("/exam", payload);
  return res.data;
};

export const getSubjectResults = async (
  examId: string,
  subjectId: string
) => {
  const res = await api.get(
    `/exam/${examId}/subject/${subjectId}/results`
  );
  return res.data;
};

export const bulkUpdateMarks = async (updates: any[]) => {
  const res = await api.patch("/exam/bulk-marks", { updates });
  return res.data;
};

export const publishExam = async (examId: string) => {
  const res = await api.patch(`/exam/${examId}/publish`);
  return res.data;
};

export const updateExamStatus = async (
  examId: string,
  status: string
) => {
  const res = await api.patch(`/exam/${examId}/status`, {
    status,
  });
  return res.data;
};