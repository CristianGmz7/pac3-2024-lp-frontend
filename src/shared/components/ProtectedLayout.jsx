import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/security/store"

//Si esta autenticado puede acceder a las rutas de administracion, si no esta autenticado regresarlo a home
export const ProtectedLayout = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);

  validateAuthentication();

  if(!isAuthenticated){
    return <Navigate to="/home"/>
  }

  return <Outlet/>
  
}
