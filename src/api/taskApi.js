import apiClient from "./apiClient";

const taskApi = {
  createTask: (boardId, params) =>
    apiClient.post(`boards/${boardId}/tasks`, params),
  moveTask: (boardId, params) =>
    apiClient.put(`boards/${boardId}/tasks/move`, params),
  deleteTask: (boardId, taskId) =>
    apiClient.delete(`boards/${boardId}/tasks/${taskId}`),
  updateTask: (boardId, taskId, params) =>
    apiClient.put(`boards/${boardId}/tasks/${taskId}`, params),
};

export default taskApi;
