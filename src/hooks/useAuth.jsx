import { getOneUser } from "../API/Api";
import { userContext } from "../context/AuthContext";
import { useContext, useCallback, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";


export const useAuth = () => {
  const { token, setToken, updatedUser } = useContext(userContext);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [actualUser, setActualUser] = useState([]);
  

  
   const login = useCallback(() => {
     setToken(localStorage.getItem("token"));
   }, [token]);


  const fetchUser = async () => {
    try {
      if (token && userId) {
        const response = await getOneUser(token, userId);
        setActualUser([response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [ updatedUser, token, userId]);

   useEffect(() => {
     const storedId = localStorage.getItem("payload");
     if (storedId) {
       setUserId(JSON.parse(storedId).id);
     }
   }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('payload');
    if (storedUser) {
      setUser(JSON.parse(storedUser).name)
    }
  }, [])

  useEffect(() => {
    const storedRole = localStorage.getItem('payload')
    if (storedRole) {
      setRole(JSON.parse(storedRole).role);
    }
  }, []);


  const logout = useCallback(() => {
    const removeToken = localStorage.removeItem('token');
    localStorage.removeItem('payload');
    setToken(removeToken);
    setActualUser([]);
  }, [token])



  return {
    isLogged: Boolean(token),
    login,
    logout,
    user,
    role,
    userId,
    actualUser,
  };
};
