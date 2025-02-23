import axiosClient from "./axiosClient";

const listApi = {
  create: (boardId) => axiosClient.post(`boards/${boardId}/lists`),
  update: (boardId, listId, params) =>
    axiosClient.put(`boards/${boardId}/lists/${listId}`, params),
  delete: (boardId, listId) =>
    axiosClient.delete(`boards/${boardId}/lists/${listId}`),
};

export default listApi;
