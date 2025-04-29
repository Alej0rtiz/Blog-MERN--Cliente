//imports de react
import { useState } from 'react';
// Import del proveedor de contexto que maneja el estado global
import DataProvider from './contexto/DataProvider';

// Import de los módulos de enrutamiento de React Router
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Import de Componentes de las vistas
import Login from './Componentes/Cuenta/Login';
import Home from './Componentes/inicio/home';
import Header from './Componentes/Cabecera/header';


//---------------------------------------------
// Componente de ruta privada que protege las rutas que requieren autenticación
//---------------------------------------------
const RutaPrivada = ({ isAuthenticated, ...props }) =>{

  return(
    isAuthenticated ? 
    <>
      <Header />
      <Outlet />
    </>

    :
    // Redirecciona al login si no está autenticado
    <Navigate replace to='/login' />

  )

};


// Componente principal de la aplicación
function App() {

  // Estado para manejar si el usuario está autenticado o no
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
        // Proporciona el contexto global a toda la aplicación
        <DataProvider>
          {/* Define el enrutamiento de la aplicación */}
          <BrowserRouter>
            <div style={{marginTop : 0}}>
              {/*Rutas*/}
              <Routes>
                {/* Ruta para el componente de inicio de sesión */}
                <Route path = '/Login' element = {<Login isUserAuthenticated={isUserAuthenticated} />} />

                  <Route path='/' element = {<RutaPrivada isAuthenticated = {isAuthenticated} />}>
                    {/* Ruta para el componente principal luego del inicio de sesión */}
                    <Route path = '/Home' element = {<Home />} />
                  </Route>

              </Routes>
            </div>
          </BrowserRouter>
        </DataProvider>
  );
}

//export del componente principal
export default App;
