"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeTokenInLS = (serverToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("logger", serverToken);
    }
  };

  const retriveTokenFromLS = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("logger");
    }
    return null;
  };

  const deleteTokenInLS = () => {
    setUser(null); // empty out user
    if (typeof window !== "undefined") {
      localStorage.removeItem("logger");
    }
  };

  const authenticate = async () => {
    try {
      const token = retriveTokenFromLS();
      if (token) {
        const request = await fetch(`/api/auth/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const response = await request.json();

        if (request.status === 200) {
          setUser(response);
          setLoading(false);
        } else {
          setUser(null);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = retriveTokenFromLS();
      setToken(token);
      setIsLoggedIn(!!token);
    }
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        deleteTokenInLS,
        retriveTokenFromLS,
        user,
        isLoggedIn,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
