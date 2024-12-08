"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("logger"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("logger", serverToken);
  };

  const retriveTokenFromLS = () => {
    return localStorage.getItem("logger");
  };

  const deleteTokenInLS = () => {
    setUser(null); // empty out user
    return localStorage.removeItem("logger");
  };

  const authenticate = async () => {
    try {
      const request = await fetch(`/api/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: retriveTokenFromLS() }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setUser(response);
        setLoading(false);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
