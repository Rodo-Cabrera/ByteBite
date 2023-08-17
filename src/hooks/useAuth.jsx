import { getOneUser } from "../API/Api";
import { userContext } from "../context/AuthContext";
import { useContext, useCallback, useState, useEffect } from "react";


export const useAuth = () => {
  const { token, setToken } = useContext(userContext);
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [userId, setUserId] = useState(null)
  const [actualUser, setActualUser] = useState([])


  
  
   const login = useCallback(() => {
     setToken(localStorage.getItem("token"));
   }, [setToken]);

  //  useEffect(() => {
  //    const resp = async () => {
  //      if (token) {
  //        await getOneUser(token, userId)
  //          .then((response) => {
  //            setActualUser([response.data]);
  //          })
  //          .catch((error) => console.log(error));
  //      }
  //    };
  //    resp()
  //  }, [token, userId]);
  
  useEffect(() => {
    const resp = async () => {
      try {
        if (token && userId) {
          const response = await getOneUser(token, userId);
          setActualUser([response.data]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    resp();
  }, [token, userId]);

   useEffect(() => {
     const storedId = localStorage.getItem("payload");
     if (storedId) {
       setUserId(JSON.parse(storedId).id);
     }
   });

  useEffect(() => {
    const storedUser = localStorage.getItem('payload');
    if (storedUser) {
      setUser(JSON.parse(storedUser).name)
    }
  })

  useEffect(() => {
    const storedRole = localStorage.getItem('payload')
    if (storedRole) {
      setRole(JSON.parse(storedRole).role);
    }
  });


  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('payload')
    setToken(null);
  }, [setToken])



  return {
    isLogged: Boolean(token),
    login,
    logout,
    user,
    role,
    userId,
    actualUser
  }
};
