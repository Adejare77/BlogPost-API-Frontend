import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "../types/auth";
import { getCurrentUser, logoutUser } from "../api/auth";
import { Toaster } from "react-hot-toast";
import { setLoginHandler, setLogoutHandler } from "../utils/authEvents";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser.data);
    } catch (err: unknown) {
      setUser(null);
    }
  };

  // On Refresh+
  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        await fetchUser();
      }
      setLoading(false);
    })();
  }, []);

  // login
  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  useEffect(() => {
    setLoginHandler(login);
    setLogoutHandler(logout);
  }, []);

  // logout
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
      <Toaster position="top-center" />
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
