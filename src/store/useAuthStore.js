// src/store/useAuthStore.js
import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

// --- Helper to attach token ---
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  token: localStorage.getItem("token") || null,
  isSigningUp: false,
  isSigningIn: false,
  isUserLoading: false,

  // --- Save user & token ---
  setAuthUser: (user, token) => {
    set({ authUser: user, token });
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    setAuthToken(token);
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);

      // assuming backend returns { access_token, user }
      const { access_token, user } = response.data;
      useAuthStore.getState().setAuthUser(user, access_token);

      toast.success("Successfully signed up!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.detail || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  signin: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/signin", data);

      // assuming backend returns { access_token, user }
      const { access_token, user } = response.data;
      useAuthStore.getState().setAuthUser(user, access_token);

      toast.success("Successfully signed in!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Signin failed");
    } finally {
      set({ isSigningIn: false });
    }
  },

  check_auth: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/auth/current-user");
      set({ authUser: response.data });
      localStorage.setItem("authUser", JSON.stringify(response.data));
    } catch (error) {
      set({ authUser: null, token: null });
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      setAuthToken(null);
      console.log("Auth check failed:", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      set({ authUser: null, token: null });
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      setAuthToken(null);
      toast.success("Logout Successfully!");
    }
  },
}));

// --- On app load, reattach token if available ---
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export default useAuthStore;
