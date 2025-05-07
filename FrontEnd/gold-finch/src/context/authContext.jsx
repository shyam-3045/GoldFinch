import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthUser = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const login = (endPoint, name, password, email) => {
    return axios.post(`http://localhost:3000/${endPoint}`, { email, password, name })
      .then((res) => {
        setToken(res.data.token);
        setUser(JSON.stringify(res.data.user));

        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))

        return "success";
      })
      .catch((err) => {
        const errMsg = err.response?.data?.msg || "Authentication Error";
        console.log(errMsg);
        return errMsg;
      });
  };

  const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const isToken=()=>
  {
    return token
  }
  return (
    <AuthUser.Provider value={{ login, token, user,logout }}>
      {children}
    </AuthUser.Provider>
  );
};

export const useAuth = () => useContext(AuthUser);
