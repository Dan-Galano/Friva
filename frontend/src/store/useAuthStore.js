import { create } from "zustand";
import { api } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check");

      set({ authUser: response.data });
    } catch (error) {
      set({ authUser: null });
      console.log("Error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
