import { userContext } from "../context/AuthContext";
import { useContext, useCallback, useState, useEffect } from "react";
import clientAxios from "../utils/clientAxios";


export const useAuth = () => {
  const { token, setToken } = useContext(userContext);
  const [user, setUser] = useState(null)


  useEffect(() => {
    const storedUser = localStorage.getItem('payload');
    if (storedUser) {
      setUser(JSON.parse(storedUser).name)
      console.log(user);
    }
  })

  
  const login = useCallback(() => {
    setToken(localStorage.getItem('token'));
  }, [setToken]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('payload')
    setToken(null);
  }, [setToken])



  return {
    isLogged: Boolean(token),
    login,
    logout,
    user
  }
};
