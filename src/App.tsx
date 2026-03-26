import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import HomePage from "./page/HomePage"


//Paginas de Ejemplo
const Admin = () => <h1 className="text-xl text-indigo-600 font-bold">Zona VIP: Panel de Administracion</h1>
const Login = () => <h1 className="text-xl text-red-500">Desdes Iniciar Sesion</h1>

function App() {
  const [user, setUser] = useState<{id:number; name: string} | null >(null)
  const login = () => setUser({id:1, name: "Alberto"})
  const logout = () => setUser(null)
  return (
    <BrowserRouter>
    <nav className="p-4 bg-slate-800 text-white flex justify-between">
      
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/admin">Admin (VIP)</Link>
      </div>

    <button className={`px-3 py-1 rounded ${user ? 'bg-red-500': 'bg-green-500'}`} onClick={user ? logout : login}>
      {user ? 'Cerrar Sesion': 'Simular Login'}
    </button>
    </nav>
    <div className="p-10">
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<Login />}/>
      {/* Ruta protegida- Envolvemos el componente admin con nuestro Guardaespalda */}
      <Route path="/admin" element={
        <ProtectedRoute isAllowed={!!user}>
          <Admin />
        </ProtectedRoute>
      } />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App