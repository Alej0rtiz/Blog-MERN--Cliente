
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


-------------------------------Estructura del proyecto Blog-MERN--Cliente-------------------------------

/src  Blog-MERN--Cliente

/src Blog-MERN--Cliente

/Componentes: Carpeta y directorio que contiene los componentes React utilizados en nuestro proyecto.

/Cuenta: Componentes relacionados con la autenticación y la cuenta del usuario.

	Login: Modulo con el formulario interactivo (inicio de sesión o registro).
		Elementos: Campos de texto, botones (iniciar sesión, Ya tengo una cuenta) y mensajes de error.

/inicio: Componentes relacionados con la página principal y la visualización de entradas.
	
	Categorías: Modulo con una lista de enlaces para filtrar los post por categorías
		Elementos: Textos con enlaces a la diferentes categorías.
	Home: Módulo que organiza la página principal en tres columnas con un diseño "Holy Grail"
		Elementos: Categorías (izquierda), posts o publicaciones (centro) recomendaciones (derecha).
	Recomendaciones: Modulo que muestra un apartado del lado derecho con sugerencias para el usuario
		Elementos: Post recomendado(Titulo, creador y categoría)

/Publicaciones: Componentes relacionados a la creación y visualización de los post.

	Post: Módulo que muestra la lista de publicaciones del blog según la categoría.
		Elementos: Texto(Título, autor, fecha y contenido del post)

/Cabecera: Componente de cabecera común para rutas privadas.

	Header: Modulo para nuestra barra superior de navegación para nuestros usuarios autenticados.
		Elementos: Titulo, Enlaces(Inicio, Perfil, Cerrar sesión)
	
/Crear: Componentes para la creación y edición de entradas del blog.

	Crearpost: Módulo para que el usuario autenticado redacte y publique un nuevo post.
		Elementos: Vista previa de imagen, botón de subir imagen, campo de título, campo de descripción, validación de campos,
			   botón "Publicar". 
	Editarpost: Módulo que permite al usuario autenticado modificar un post ya creado.      
		Elementos: Carga y vista previa de imagen, campos prellenados de título y descripción, validación de campos, botón
			   "Actualizar".

/Detalles: Componente para mostrar detalles específicos de una entrada del blog.
	
	PostDetallado: Módulo que muestra el contenido completo de una publicación seleccionada.
        Elementos: Imagen destacada, título, autor, fecha, descripción, botones (editar/eliminar si es el autor), y sección de     			   
                   comentarios.

