import { userContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuth = () => {
  const context = useContext(userContext);
  if (!context) throw new Error('useAuth debe ser usado en el contexto de userContext');
  return context;
};
