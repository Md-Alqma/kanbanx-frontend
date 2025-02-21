import { create } from "zustand";
import apiClient from "@/api/apiClient";
import useBoardStore from "./boardStore";

const useListStore = create((set) => ({
  lists: [],
  loading: false,
  list: null,

  addList: async (boardId, title) => {
    try {
      const response = await apiClient.post("/lists", { boardId, title });

      const boardStore = useBoardStore.getState();
      const boards = boardStore.boards || [];
      const setBoardStore = useBoardStore.setState;

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

  fetchLists: async (boardId) => {
    set({ loading: true });
    try {
      const response = await apiClient.get(`/lists/${boardId}`);
      set({ lists: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  },

  singleList: async (listId) => {
    set({ loading: true });
    try {
      const response = await apiClient.get(`/lists/${listId}`);
      set({ list: response.data, loading: false });
      return response.data;
    } catch (error) {
      console.error("Error getting list: ", error);
    }
  },

  updateList: async (listId, boardId, title) => {
    try {
      const response = await apiClient.put(`/lists/${listId}`, updatedData);

      const boardStore = useBoardStore.getState();
      const boards = boardStore.boards || [];
      const setBoardStore = useBoardStore.setState;

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

      const boardStore = useBoardStore.getState();
      const boards = boardStore.boards || [];
      const setBoardStore = useBoardStore.setState;

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
