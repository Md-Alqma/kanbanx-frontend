import { create } from "zustand";
import apiClient from "@/api/apiClient";
import useBoardStore from "./boardStore";

const useListStore = create((set) => ({
  lists: [],
  loading: false,

  addList: async (boardId, title) => {
    try {
      const response = await apiClient.post("/lists", { boardId, title });

      const { boards, set: setBoardStore } = useBoardStore();

      setBoardStore({
        boards: boards.map((board) =>
          board._id === boardId
            ? { ...board, lists: [...(board.lists || []), response.data] }
            : board
        ),
      });
      set((state) => ({
        lists: [...state.lists, response.data],
      }));
    } catch (error) {
      console.error("Error creating list:", error);
    }
  },

  updateList: async (listId, boardId, title) => {
    try {
      const response = await apiClient.put(`/lists/${listId}`, updatedData);

      const { boards, set: setBoardStore } = useBoardStore();

      setBoardStore({
        boards: boards.map((board) =>
          board._id === boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list._id === listId ? { ...list, ...response.data } : list
                ),
              }
            : board
        ),
      });
      set((state) => ({
        lists: state.lists.map((list) =>
          list._id === listId ? { ...list, ...response.data } : list
        ),
      }));
    } catch (error) {
      console.error("Error updating list:", error);
    }
  },

  deleteList: async (listId, boardId) => {
    try {
      await apiClient.delete(`/lists/${listId}`);

      const { boards, set: setBoardStore } = useBoardStore.getState();

      setBoardStore({
        boards: boards.map((board) =>
          board._id === boardId
            ? {
                ...board,
                lists: board.lists.filter((list) => list._id !== listId),
              }
            : board
        ),
      });

      set((state) => ({
        lists: state.lists.filter((list) => list._id !== listId),
      }));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  },
}));

export default useListStore;
