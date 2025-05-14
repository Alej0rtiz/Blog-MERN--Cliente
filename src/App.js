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
import CreatePost from './Componentes/Crear/crearPost';
import PostDetallado from './Componentes/Detalles/PostDetallado';


//---------------------------------------------
// Componente de ruta privada que protege las rutas que requieren autenticación
//---------------------------------------------
const RutaPrivada = ({ isAuthenticated, ...props }) =>{

  return(
    isAuthenticated ? 
    <>
      <Header />  {/* Cabecera común para rutas privadas */}
      <Outlet />  {/* Renderiza el componente hijo correspondiente */}
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
            <div style={{ paddingTop: '64px', backgroundColor: '#0f172a', minHeight: '100vh' }}>
              {/*Rutas*/}
              <Routes>
                {/* Ruta para el componente de inicio de sesión */}
                <Route path = '/Login' element = {<Login isUserAuthenticated={isUserAuthenticated} />} />
                
                {/* Rutas privadas protegidas */}
                <Route path='/' element={<RutaPrivada isAuthenticated={isAuthenticated} />}>
                  {/* Página principal (home) */}
                  <Route index element={<Home />} /> {/* ruta raiz o /?category=... */}
                  {/* Página de inicio explícita */}
                  <Route path='home' element={<Home />} /> {/* /home */}
                  {/* Página para crear una entrada */}
                  <Route path='create' element={<CreatePost />} /> {/* /create?category=... */}
                  <Route path='details/:id' element={<PostDetallado />} /> {/* /details/... */}
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </DataProvider>
  );
}

//export del componente principal
export default App;


/*
<Route path='/' element = {<RutaPrivada isAuthenticated = {isAuthenticated} />}>
                  
                  <Route path = '/' element = {<Home />} />
                </Route>

                <Route path='/Create' element = {<RutaPrivada isAuthenticated = {isAuthenticated} />}>
                  
                  <Route path = '/Create' element = {<CreatePost />} />
</Route>

por si app.js da errores al renderizar partes relacionadas a las categorias, hacer revision de esta seccion, gracias
*/
