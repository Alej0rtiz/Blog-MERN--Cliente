import './App.css';

// Import del proveedor de contexto que maneja el estado global
import DataProvider from './contexto/DataProvider';

// Import de los módulos de enrutamiento de React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Import de Componentes de las vistas
import Login from './Componentes/Cuenta/Login';
import Home from './Componentes/inicio/home';


// Componente principal de la aplicación
function App() {
  return (
        // Proporciona el contexto global a toda la aplicación
        <DataProvider>
          {/* Define el enrutamiento de la aplicación */}
          <BrowserRouter>
            <div style={{marginTop : 100}}>
              {/*Rutas*/}
              <Routes>
                {/* Redirecciona desde la raíz hacia la página de login */}
                <Route path="/" element={<Navigate to="/Login" />} />
                {/* Ruta para el componente de inicio de sesión */}
                <Route path = '/Login' element = {<Login />} />
                {/* Ruta para el componente principal luego del inicio de sesión */}
                <Route path = '/Home' element = {<Home />} />
              </Routes>
            </div>
          </BrowserRouter>
        </DataProvider>
  );
}

//export del componente principal
export default App;
