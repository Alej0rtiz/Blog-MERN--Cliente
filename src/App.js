//imports de react
import { useState, useEffect } from 'react';
// Import del proveedor de contexto que maneja el estado global
import DataProvider from './contexto/DataProvider';
//import de Helmet-provider para metadatos
import { HelmetProvider } from 'react-helmet-async';
// Import de los módulos de enrutamiento de React Router
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Import de Componentes de las vistas
import Login from './Componentes/Cuenta/Login';
import Home from './Componentes/inicio/home';
import Header from './Componentes/Cabecera/header';
import CreatePost from './Componentes/Crear/crearPost';
import PostDetallado from './Componentes/Detalles/PostDetallado';
import EditPost from './Componentes/Crear/editarPost';
import ScrollToTop from './Componentes/Utilidad/scroll';
import { getTokenAccess } from './utilidades/common';
import Profile from './Componentes/inicio/profile';

//---------------------------------------------
// Componente de ruta privada que protege las rutas que requieren autenticación
//---------------------------------------------
const RutaPrivada = ({ isAuthenticated, isCheckingAuth }) =>{

    const location = useLocation();

    if (isCheckingAuth) {
    return null;
    }

    if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
    }

  return(

    <>
      <header><Header /></header>  {/* Cabecera común para rutas privadas */}
      <Outlet />  {/* Renderiza el componente hijo correspondiente */}
    </>

  )

};


// Componente principal de la aplicación
function App() {

  // Estado para manejar si el usuario está autenticado o no
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  //estado de checkeo de la autenticacion
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {

    const token = getTokenAccess();
    if(token){
        isUserAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, [])

  if (isCheckingAuth) {
    return (

      <>

      <div role="status" aria-live="polite" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)',
        color: 'white',
        fontSize: '2rem'
      }}>
        <span className="sr-only">Validando auth...</span>
        {/*espacio para algo visual*/}
      </div>
    </>
    )
  }

  return (
      <HelmetProvider>
        {/*Contexto global para toda la aplicación */}
        <DataProvider>
          {/* Define el enrutamiento de la aplicación */}
          <BrowserRouter>

            <ScrollToTop />

            <div style={{ paddingTop: '0px', backgroundColor: '#0f172a', maxHeight: '100vh' }}>
              <main>
              {/*Rutas*/}
              <Routes>
                {/* Ruta para el componente de inicio de sesión */}
                <Route path = '/Login' element = {<Login isUserAuthenticated={isUserAuthenticated} />} />
                
                {/* Rutas privadas protegidas */}
                <Route path='/' element={<RutaPrivada isAuthenticated={isAuthenticated} isCheckingAuth={isCheckingAuth} />}>
                  {/* Página principal (home) */}
                  <Route index element={<Home />} /> {/* ruta raiz o /?category=... */}
                  {/* Página de inicio explícita */}
                  <Route path='home' element={<Home />} /> {/* /home */}
                  {/* Página para crear una entrada */}
                  <Route path='create' element={<CreatePost />} /> {/* /create?category=... */}
                  <Route path='details/:id' element={<PostDetallado />} /> {/* /details/... */}

                  <Route path='edit/:id' element={<EditPost />} /> {/* /create?category=... */}
                  <Route path='profile' element={<Profile />} /> {/* /profile */}
                </Route>
              </Routes>
              </main>
            </div>
          </BrowserRouter>
        </DataProvider>
      </HelmetProvider>
  );
}

//export del componente principal
export default App;
