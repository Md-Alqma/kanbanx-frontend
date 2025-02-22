import apiClient from "./apiClient";

const listApi = {
  createList: (boardId) => apiClient.post(`boards/${boardId}/lists`),
  updateList: (boardId, listId, params) =>
    apiClient.put(`boards/${boardId}/lists/${listId}`, params),
  deleteList: (boardId, listId) =>
    apiClient.delete(`boards/${boardId}/lists/${listId}`),
};

export default listApi;
