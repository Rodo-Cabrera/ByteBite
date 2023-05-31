import { createContext, useEffect, useState } from "react";

export const userContext = createContext();


export const AuthProvider = ({ children }) => {

  
  const [user, setUser] = useState(null);
  
  const data = { user };


  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
};

