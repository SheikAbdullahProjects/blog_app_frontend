import {create} from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';


const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUserLoading: false,
  
  setAuthUser: (user) => set({ authUser: user }),
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      localStorage.setItem("authUser", JSON.stringify(response.data));
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
      set({ authUser: response.data });
      localStorage.setItem("authUser", JSON.stringify(response.data));
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
      set({ authUser: null });
      localStorage.removeItem("authUser");
      console.log(error)
    } finally {
      set({ isUserLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
      toast.success("Logout Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Logout failed");
    }
  },
}));


export default useAuthStore;