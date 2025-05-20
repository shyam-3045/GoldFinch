import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../../axios.config';
import { useAlert } from './AlertMsgContext';

const AuthUser = createContext();

export const AuthProvider = ({ children }) => {
  const {alertMsg}=useAlert()
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [ordersDet,setOrdersDet]=useState()

  const login = (endPoint, name, password, email) => {
    return axios.post(`https://goldfinch-backend.onrender.com/${endPoint}`, { email, password, name })
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
    alertMsg("Logged Out !")


  }

useEffect(()=>
{
  (async function() {
    const res=await axios.get("https://goldfinch-backend.onrender.com/api/get-orders")
    setOrdersDet(res.data)
})();
},[])
  


  return (
    <AuthUser.Provider value={{ login, token, user,logout,ordersDet }}>
      {children}
    </AuthUser.Provider>
  );
};

export const useAuth = () => useContext(AuthUser);
