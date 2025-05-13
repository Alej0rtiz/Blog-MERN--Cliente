// Mensajes de notificación usados en toda la aplicación para mostrar estados de carga, éxito o errores
export const API_NOTIFICATION_MESSAGES = {
    // Mensaje mostrado mientras se espera la respuesta del servidor
    loading: {
        title: 'Cargando...',
        message: 'Por favor, espere mientras se carga la información.',
    },
    // Mensaje para operaciones completadas con éxito
    success: {
        title: 'Éxito',
        message: 'La operación se realizó con éxito.',
    },
    // Mensaje mostrado si hay un error al recibir la respuesta del servidor
    responseError: {
        title: 'Error de respuesta',
        message: 'Ocurrió un error mientras se procesaba la respuesta del servidor, por favor intente nuevamente.',
    },
    // Mensaje mostrado si ocurre un error al enviar la solicitud
    requestError:{
        title: 'Error de solicitud',
        message: 'Ocurrio un error mientras se procesaba la solicitud, por favor intente nuevamente.'
    },
    // Mensaje mostrado si hay un problema de red (ej. sin conexión)
    networkError:{
        title: 'Error de red',
        message: 'No se pudo conectar al servidor, por favor verifique su conexión a internet e intente nuevamente.'
    },
}

// Configuración de las rutas y métodos HTTP de los servicios disponibles en la API
export const SERVICE_URLS = {
    //formato = Ruta relativa del endpoint y Método HTTP para esta petición
    userSignup: {url: '/signup', method: 'POST'}, //Endpoint para registrar un nuevo usuario
    userLogin: {url: '/login', method: 'POST'},   //Endpoint para inicio de sesion de usuario
    uploadFile: {url: '/file/upload', method: 'POST'}, //endpoint para la subida de archivos 
    createPost: {url: 'create', method: 'POST'}, //endpoint para la creación de un nuevo post
    getAllPosts: {url: '/posts', method: 'GET', params: true}, //endpoint para obtener todos los posts, con params 
}