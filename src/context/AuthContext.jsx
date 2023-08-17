import React, { createContext, useState } from "react";



export const userContext = createContext();


export const AuthProvider = ({ children }) => {

 const [token, setToken] = useState(()=> window.localStorage.getItem('token'));


  return (
    <userContext.Provider value={{token, setToken}}>
      {children}
    </userContext.Provider>
  )
};

