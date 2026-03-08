import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;






// import { useAuthStore } from "@/store/auth.store";
// import axios from "axios";


// const api = axios.create({
//   baseURL: "http://localhost:3000/api/v1",
// });

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
// localStorage.getItem("auth-storage")

// export default api;