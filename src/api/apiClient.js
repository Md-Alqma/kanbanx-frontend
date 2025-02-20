import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // Important for cookies (sestion based authentication)
});

export default apiClient;
