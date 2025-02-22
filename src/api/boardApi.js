import apiClient from "./apiClient";

const boardApi = {
  createBoard: () => apiClient.post("boards"),
  getBoards: () => apiClient.get("boards"),
  updateBoardPosition: (params) => apiClient.put("boards", params),
  getSingleBoard: (id) => apiClient.get(`boards/${id}`),
  deleteBoard: (id) => apiClient.delete(`boards/${id}`),
  updateBoard: (id, params) => apiClient.put(`boards/${id}`, params),
};

export default boardApi;
