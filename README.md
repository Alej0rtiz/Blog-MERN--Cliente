## Frontend del proyecto Blog MERN DevSim

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

El frontend del proyecto Devsim funciona como el punto central de comunicación y gestión de datos. 
Expone una serie de endpoints (API) que permiten a la interfaz de usuario (cliente con React) realizar operaciones esenciales como
registrar usuarios, iniciar sesión, crear publicaciones, comentar y cargar imágenes. Cada acción que el usuario realiza desde el frontend, como publicar un blog o ver comentarios, envía una solicitud
al servidor, el cual responde con los datos necesarios o actualiza la base de datos.

Gracias al diseño modular del backend y al uso de tecnologías como JWT para la autenticación, Mongoose para
manejar los modelos de datos, y middleware para proteger rutas, el frontend puede centrarse en la experiencia 
de usuario sin preocuparse por la lógica del proyecto o su seguridad.

---

### Instalación y Ejecución del Proyecto

1. Clonar el proyecto desde nuestro repositorio en GitHub usando cualquier terminal que se prefiera, recomendamos [Warp](https://www.warp.dev/).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
git clone https://github.com/Alej0rtiz/Blog-MERN--Cliente.git
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2. Una vez clonado, entramos a la carpeta del proyecto:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd C:\Users\Usuario1\Documents\Blog-MERN--Cliente
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3. Una vez en la carpeta del proyecto nos aseguramos de descargar todas las dependencias de nuestro
paquete en package.json (hay que contar con [Node y npm](https://nodejs.org/en)).

~~~~~~~~~~~
npm install
~~~~~~~~~~~

4. La estructura del archivo `.env` incluye:

`REACT_APP_API_URL`: URL correspondiente al Backend, al cual se enviaran las peticiones.

5. Una vez finalizada la instalación, podemos ya iniciar el proyecto así:

~~~~~~~~~
npm start
~~~~~~~~~

6. Se abrirá el proyecto de forma local y automática en nuestro navegador por defecto, normalmente 
con la URL `http://localhost:3000` (configurable).

---

## Estructura del proyecto

/src Blog-MERN--Cliente

/assets: Almacena elementos como imagenes y videos para contenido de la pagina

/Componentes: Carpeta y directorio que contiene los componentes React utilizados en nuestro proyecto.

/Constantes: contiene configuracion de endpoints y alertas para la comunicación con el backend y constante de las categorias de los posts

/Contexto: contiene el datacontext para validacion de sesiones iniciadas

/Servicio: Contiene la instancia de axios que se comunicará con el Backend

/Utilidades: contiene funciones de utilidad genericas relacionadas a renderizado de contenido y manejo de los Tokens

---

## Dependencias del frontend del proyecto

Este proyecto utiliza React.js como la biblioteca principal para construir la interfaz de usuario del frontend.
React permite desarrollar componentes reutilizables que se actualizan de forma eficiente ante 
cambios en los datos. Además, se apoya en herramientas como react-router-dom para la navegación entre páginas
sin recarga, y axios para la comunicación fluida con el backend mediante peticiones HTTP.

El diseño visual se apoya en Material UI, una librería de componentes estilizados que mejora la 
experiencia del usuario y acelera el desarrollo de interfaces responsivas. Gracias a esta estructura moderna,
el frontend se mantiene organizado, dinámico y orientado a una experiencia intuitiva para el usuario final.

---

#### Interfaz de usuario general:

`@mui/material, @mui/icons-material`: Permiten construir interfaces modernas y responsivas usando 
Material UI, una biblioteca de 	componentes visuales, con diseño coherente y accesible (Botones, 
tarjetas, íconos, barras de 	navegación, formularios, etc.)

`@emotion/react, @emotion/styled`: Son librerías de CSS-in-JS que permiten aplicar estilos 	
directamente dentro de componentes React, lo cual se integra perfectamente con Material 
UI para personalizar estilos fácilmente.

#### Navegación y peticiones

`react-router-dom`: Se encarga del manejo de rutas del lado del cliente. Permite navegar entre páginas del blog 
(Home, Login, Detalle 	de Post, etc.) sin recargar la web, usando componentes como <BrowserRouter>, <Routes> y <Link>.

`axios`: Es el cliente HTTP que permite enviar peticiones al backend (GET, POST, PUT, DELETE). 
Se usa para consumir las APIs del servidor y trabajar con los datos (usuarios, posts, comentarios...).

`react-helmet-async`: Permite gestionar las etiquetas <head> de forma dinámica (como el título y 
metadatos de una página) desde componentes React, útil para SEO y accesibilidad en apps SPA (Single Page Application).

#### Test y métricas
	
`@testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @testing-library/dom`: Conjunto de herramientas para realizar pruebas automatizadas de componentes React, simulando 
interacciones del usuario. Aseguran que el frontend funcione correctamente bajo distintos escenarios.

`web-vitals`: Mide indicadores clave de rendimiento como tiempo de carga, interactividad y estabilidad visual, 
ayudando a optimizar la experiencia del usuario.
