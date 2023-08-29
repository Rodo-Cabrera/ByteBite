import React, { createContext, useState, useEffect } from "react";
import { getOneUser } from "../API/Api";
import { useAuth } from "../hooks/useAuth";



export const userContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => window.localStorage.getItem('token'));
  const [updatedUser, setUpdatedUser] = useState(false);

  const handleUpdateUser = () => {
    return setUpdatedUser(true);
  };


  return (
    <userContext.Provider value={{token, setToken, handleUpdateUser, updatedUser}}>
      {children}
    </userContext.Provider>
  )
};

