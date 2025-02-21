import { create } from "zustand";
import apiClient from "@/api/apiClient";
import useBoardStore from "./boardStore";

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  task: null,

  addTask: async (listId, title, description, dueDate, priority) => {
    try {
      const response = await apiClient.post(`/tasks`, {
        listId,
        title,
        description,
        dueDate,
        priority,
      });

      const boardStore = useBoardStore.getState();
      const boards = boardStore.boards || []; // Ensure it's an array
      const setBoardStore = useBoardStore.setState;

      setBoardStore({
        boards: boards.map((board) => ({
          ...board,
          lists: board.lists.map((list) =>
            list._id === listId
              ? { ...list, tasks: [...(list.tasks || []), response.data] }
              : list
          ),
        })),
      });

      set((state) => ({
        tasks: [...state.tasks, response.data],
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  deleteTask: async (taskId, listId) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          lists: board.lists.map((list) =>
            list._id === listId
              ? {
                  ...list,
                  tasks: list.tasks.filter((task) => task._id !== taskId),
                }
              : list
          ),
        })),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

  updateTask: async (taskId, updatedData) => {
    try {
      const response = await apiClient.put(`/tasks/${taskId}`, updatedData);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === taskId ? { ...task, ...response.data } : task
        ),
      }));
    } catch (error) {
      console.error("Error updating task", error);
    }
  },

  moveTask: async (taskId, newListId) => {
    try {
      const response = await apiClient.put(`/tasks/${taskId}/move`, {
        listId: newListId,
      });
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          lists: board.lists.map((list) => {
            if (list._id === newListId) {
              return { ...list, tasks: [...list.tasks, response.data.task] };
            }
            return {
              ...list,
              tasks: list.tasks.filter((task) => task._id !== taskId),
            };
          }),
        })),
      }));
    } catch (error) {
      console.error("Error moving task:", error);
    }
  },
}));

export default useTaskStore;
