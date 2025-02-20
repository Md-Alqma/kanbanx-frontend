import { create } from "zustand";
import apiClient from "@/api/apiClient";

const useBoardStore = create((set) => ({
  boards: [],
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

  createBoard: async (title) => {
    try {
      const response = await apiClient.post("/boards", { title });
      set((state) => ({ boards: [...state.boards, response.data] }));
      return response.data;
    } catch (error) {
      console.error("Error adding board", error);
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
