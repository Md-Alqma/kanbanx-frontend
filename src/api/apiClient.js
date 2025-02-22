import axios from "axios";
import queryString from "query-string";

const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  paramsSerializer: (params) => queryString.stringify({ params }),
});

apiClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

apiClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!error.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default apiClient;
