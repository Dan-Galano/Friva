import { create } from "zustand";
import { api } from "../lib/axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

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

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await api.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account created successfully.");
    } catch (error) {
      toast.error("Error in signup function", error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("You're now logged in.");
    } catch (error) {
      console.log("Error in login function", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error in logout function", error);
      toast.error("Logout failed.");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await api.put("/auth/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ authUser: response.data });
      toast.success("Your profile has been updated.");
    } catch (error) {
      console.log("Error in updateProfile", error);
      toast.error("An error occured. Please try again later.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
