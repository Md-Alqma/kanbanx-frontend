import { create } from "zustand";
import apiClient from "@/api/apiClient";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  register: async (email, password) => {
    set({ loading: true });
    try {
      const response = await apiClient.post("/users/register", {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
    }
  },

  login: async () => {
    set({ loading: true });
    try {
      const response = await apiClient.post("users/login", { email, password });
      set({ user: response.data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Login failed",
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/users/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await apiClient.get("/users/me");
      set({ user: response.data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));

export default useAuthStore;
