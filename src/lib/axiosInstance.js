import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-app-backend-il93.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
