import { api } from "../../configs/axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/api/users/login", { email, password });
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed: ", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const register = async ({ fullName, email, password }) => {
    try {
      const { data } = await api.post("/api/users/register", {
        fullName,
        email,
        password,
      });
      toast.success(data.message);

      const loginRes = await api.post("/api/users/login", {
        email,
        password,
      });
      const { token, user, message } = loginRes.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Register failed: ", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth was used outside of AuthProvider");
  return context;
};
