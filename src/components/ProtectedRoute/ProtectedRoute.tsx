import { Navigate } from "react-router-dom"

interface Props {
    isAllowed: boolean;
    children: React.ReactNode; // Representa el contenido que queremos proteger
}

const ProtectedRoute = ({isAllowed, children}:Props) => {
    //Si no esta permitido, lo enviamos al Login inmediatamente
    if(!isAllowed){
        return <Navigate to="/login"/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute