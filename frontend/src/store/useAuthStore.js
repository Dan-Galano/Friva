import { create } from "zustand";
import { api } from "../lib/axios";
import { toast } from "sonner";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
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
      get().connectSocket();
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

      // call connectSocket function
      get().connectSocket();
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
      get().disconnectSocket();
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

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) {
      return;
    }

    const socket = io(SOCKET_URL, {
      query: {
        userId: authUser._id,
      },
      transports: ["websocket"],
    });
    socket.connect();

    set({ socket: socket });

    // to listen for an event from socket.io, use socket.on()
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    // If you are connected, onle then try to disconnect.
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
