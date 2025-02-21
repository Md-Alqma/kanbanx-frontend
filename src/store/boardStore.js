import { create } from "zustand";
import apiClient from "@/api/apiClient";

const useBoardStore = create((set) => ({
  boards: [],
  board: null,
  loading: false,

  fetchBoards: async () => {
    set({ loading: true });
    try {
      const response = await apiClient.get("/boards");
      set({ boards: response.data, loading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching boards", error);
      set({ loading: false });
    }
  },

  singleBoard: async (boardId) => {
    set({ loading: true });
    try {
      const response = await apiClient.get(`/boards/${boardId}`);
      set({ board: response.data, loading: false });
    } catch (error) {
    }
  },
  createBoard: async (title) => {
    try {
      const response = await apiClient.post("/boards", { title });
      set((state) => ({ boards: [...state.boards, response.data] }));
      return response.data;
    } catch (error) {
      console.error("Error adding board", error);
    }
  },

  updateBoard: async (boardId, title) => {
    try {
      const response = await apiClient.put(`/boards/${boardId}`, { title });
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? { ...board, ...response.data } : board
        ),
      }));
    } catch (error) {
      console.error("Error updating board:", error);
    }
  },

  deleteBoard: async (boardId) => {
    try {
      await apiClient.delete(`/boards/${boardId}`);
      set((state) => ({
        boards: state.boards.filter((b) => b._id !== boardId),
      }));
    } catch (error) {
      console.error("Error deleting board", error);
    }
  },
}));

export default useBoardStore;
