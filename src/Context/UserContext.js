import { createContext, useContext, useState } from "react";

// Se crea el contexto para acceder a los datos del user en toda la app
const UserContext = createContext();

// Componente proveedor del contexto de usuario.
// Este componente envuelve la app para que los datos del user esten accesible de froma global
export function UserProvider({children}) {

    // Define el estado global 'user' y su función state para updatearlo
    // Por defecto, no hay usuario (null)
    const [user, setUser] = useState(null);

    // Devuelve el proveedor del contexto, pasando al user y la función para actualizarlo como valor
    // Asi cualquier componente dentro de UserProvider puede manipular los datos del user
    return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} 
    </UserContext.Provider>
  );
}

// Hook custom para acceder facilmente al contexto del usuario desde cualquier componente
export function useUser() {
  return useContext(UserContext);
}