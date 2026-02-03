import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("user/me");

        // ❗ Allow ONLY admins
        if (
          ["SUPER_ADMIN", "USER_ADMIN", "PRODUCT_ADMIN"].includes(
            res.data.user.role
          )
        ) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        // 401 is NORMAL when not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const logout = async () => {
    await api.post("user/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
