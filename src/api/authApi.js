import apiClient from "./apiClient";

const authApi = {
  register: (params) => apiClient.post("users/register", params),
  login: (params) => apiClient.post("users/login", params),
  verifyToken: () => apiClient.post("users/verifyToken"),
};

export default authApi;
