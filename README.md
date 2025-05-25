---------------------------------Instalación y Ejecución del Proyecto---------------------------------

1. Clonar el proyecto desde nuestro repositorio Estructura del proyecto Blog-MERN--Cliente en GitHub,
 usando cualquier terminal que se prefiera, en este caso usamos Warp.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
git clone https://github.com/Alej0rtiz/Blog-MERN--Cliente.git
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2. Una vez clonado, entramos a la carpeta del proyecto:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd C:\Users\Usuario1\Documents\Blog-MERN--Cliente
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3. Una vez en la carpeta del proyecto nos aseguramos de descargar todas las dependencias de nuestro
paquete en package.json.

~~~~~~~~~~~
npm install
~~~~~~~~~~~

4. Una vez finalizada la instalación, podemos ya iniciar el proyecto así:

~~~~~~~~~
npm start
~~~~~~~~~

5. Se abrirá el proyecto de forma local y automática en nuestro navegador por defecto, normalmente 
con la  http://localhost:3000.

--------------------------Orientación del frontend del proyecto Blog MERN DevSim---------------------------

El frontend de nuestro proyecto Devsim Blog-MERN--Cliente funciona como el punto central de comunicación
y gestión de datos. Expone una serie de endpoints (API) que permiten a la interfaz de usuario (cliente con React)
realizar operaciones esenciales como registrar usuarios, iniciar sesión, crear publicaciones, comentar y cargar imágenes.
Cada acción que el usuario realiza desde el frontend, como publicar un blog o ver comentarios, envía una solicitud
al servidor, el cual responde con los datos necesarios o actualiza la base de datos.

Gracias al diseño modular del backend y al uso de tecnologías como JWT para la autenticación, Mongoose para
manejar los modelos de datos, y middleware para proteger rutas, el frontend puede centrarse en la experiencia 
de usuario sin preocuparse por la lógica del proyecto o seguridad.


---------------------------------Estructura del proyecto Blog-MERN--Cliente---------------------------------

/src Blog-MERN--Cliente

	/Componentes: Carpeta y directorio que contiene los componentes React utilizados en nuestro proyecto.

	/Cuenta: Componentes relacionados con la autenticación y la cuenta del usuario.

	/inicio: Componentes relacionados con la página principal y la visualización de entradas.
	
	/Publicaciones: Componentes relacionados a la creación y visualización de los post.

	/Cabecera: Componente de cabecera común para rutas privadas.

	/Crear: Componentes para la creación y edición de entradas del blog.

	/Detalles: Componente para mostrar detalles específicos de una entrada del blog.

---------------------------Dependencias del frontend del proyecto Blog MERN DevSim---------------------------

Este proyecto utiliza React.js como la biblioteca principal para construir la interfaz de usuario del frontend.
React permite desarrollar componentes reutilizables que se actualizan de forma eficiente ante 
cambios en los datos. Además, se apoya en herramientas como react-router-dom para la navegación entre páginas
sin recarga, y axios para la comunicación fluida con el backend mediante peticiones HTTP.

El diseño visual se apoya en Material UI, una librería de componentes estilizados que mejora la 
experiencia del usuario y acelera el desarrollo de interfaces responsivas. Gracias a esta estructura moderna,
el frontend se mantiene organizado, dinámico y orientado a una experiencia intuitiva para el usuario final.

Dependencias:

	/@mui/material, @mui/icons-material: Permiten construir interfaces modernas y responsivas usando 
	Material UI, una biblioteca de 	componentes visuales, con diseño coherente y accesible (Botones, 
	tarjetas, íconos, barras de 	navegación, formularios, etc.)

	/@emotion/react, @emotion/styled: Son librerías de CSS-in-JS que permiten aplicar estilos 	
	directamente dentro de componentes 	React, lo cual se integra perfectamente con Material 
	UI para personalizar estilos fácilmente.

-------------------------------------Navegación y peticiones----------------------------------------------

Dependencias: 

	/react-router-dom: Se encarga del manejo de rutas del lado del cliente. Permite navegar entre páginas del blog 
	(Home, Login, Detalle 	de Post, etc.) sin recargar la web, usando componentes como <BrowserRouter>, <Routes> y <Link>.

	/axios: Es el cliente HTTP que permite enviar peticiones al backend (GET, POST, PUT, DELETE). 
	Se usa para consumir las APIs del servidor y trabajar con los datos (usuarios, posts, comentarios...).

	/react-helmet-async: Permite gestionar las etiquetas <head> de forma dinámica (como el título y 
	metadatos de una página) desde componentes React, útil para SEO y accesibilidad en apps SPA (Single Page Application).

-----------------------------------------Test y métricas--------------------------------------------------

Dependencias:
	
	/@testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @testing-library/dom
	Conjunto de herramientas para realizar pruebas automatizadas de componentes React, simulando 
	interacciones del usuario. Aseguran que el frontend funcione correctamente bajo distintos escenarios.

	/web-vitals: Mide indicadores clave de rendimiento como tiempo de carga, interactividad y estabilidad visual, 
	ayudando a optimizar la experiencia del usuario.



	
	/Detalles: Componente para mostrar detalles específicos de una entrada del blog.
		
		PostDetallado: Módulo que muestra el contenido completo de una publicación seleccionada.
    			Elementos: Imagen destacada, título, autor, fecha, descripción, botones 
				   (editar/eliminar si es el autor), y sección de comentarios.
       
