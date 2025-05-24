// Inport de funciones de React necesarias para crear contexto y manejar estado
import { createContext, useState } from "react";
import { useEffect } from "react";
import { getTokenAccess } from "../utilidades/common";

import { API } from "../Servicio/api";

//Crea el contexto que se usará para compartir datos globalmente en la app
export const DataContext = createContext(null);

// Componente proveedor que envuelve a los componentes hijos y les brinda acceso al contexto
const DataProvider = ({ children }) => {

    useEffect(() => {
        const token = getTokenAccess();
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await API.getUserProfile();
                    if (response.IsSuccess) {
                        const user = response.data;
                        setAccount({
                            username: user.username,
                            name: user.name
                        });
                    }
                } catch (error) {
                    console.error("No se pudo cargar el perfil del usuario:", error);
                }
            };

            fetchUserProfile();
        }
    }, []);

    // Estado que almacena la información de la cuenta del usuario (username y name)
    const [account, setAccount] = useState({ username: '', name: '' })

    return  (
        // Proporciona el contexto a los componentes hijos que estén dentro del árbol del proveedor
        <DataContext.Provider value={{

            account,
            setAccount

        }}>
            {children} {/* Renderiza los componentes hijos que consumirán este contexto */}
        </DataContext.Provider>
    )
}

// Exporta el proveedor para que pueda envolverse la aplicación o partes de ella
export default DataProvider;