import React, { createContext, useEffect, useState, useReducer } from "react";
import clientAxios from "../utils/clientAxios";
import { endPointUsers } from "../utils/endpointsConfig";


export const userContext = createContext();


export const AuthProvider = ({ children }) => {

 const [token, setToken] = useState(()=> window.localStorage.getItem('token'));


  return (
    <userContext.Provider value={{token, setToken}}>
      {children}
    </userContext.Provider>
  )
};

