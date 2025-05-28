// Impors de axios para hacer peticiones HTTP
import axios from 'axios';

//imports de mensajes de error y rutas de servicio desde la configuración del proyecto
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constantes/config';

// Import de funciones para obtener el token de acceso y el usuario autenticado
import { getTokenAccess, getRefreshToken, setAccessToken, getType } from '../utilidades/common';

// URL base del servidor backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'; 

//const API_URL = 'http://localhost:8000';

//instancia personalizada de axios con configuración predeterminada
const axiosInstance = axios.create({

    baseURL: API_URL,
    timeout: 10000, // tiempo máximo de espera de 10 segundos
    headers: {
        "Accept": "application/json, multipart/form-data",
        //'Content-Type': 'application/json', // se espera enviar y recibir JSON
    },
});


// Interceptor de peticiones
// Se ejecuta antes de que una petición sea enviada
axiosInstance.interceptors.request.use(
    function (config) {

        if (!config._customProcessed) {
        

        if (config.TYPE.params) {
            
            config.params = config.TYPE.params; //si el endpoint requiere parámetros, se añaden a la configuración
        
        }else if (config.TYPE.query) {

            config.url = config.url + "/" + config.TYPE.query; //si el endpoint requiere query, se añade a la configuración

        }
        config._customProcessed = true; // Marca como ya procesado
    }
        //abierto a poder añadir cabeceras de autenticación u otros cambios globales
        return config;
    },
    function (error) {
        // Captura errores antes de que la petición se envíe
        return Promise.reject(error);
    }
);

// Interceptor de respuestas
// Se ejecuta automáticamente al recibir una respuesta del backend
axiosInstance.interceptors.response.use(

    function (response) {
        // Procesa la respuesta con una función personalizada
        return ProcessResponse(response);
    },
    
    async function (error) {
        
        const originalRequest = error.config;

        // Si el error es 401 y no se ha intentado ya refrescar el token
        if(error.response?.status === 401 && !originalRequest._retry){

            originalRequest._retry = true;

            try{

                const refreshToken = getRefreshToken();

                const response = await axios.post(`${API_URL}/token/refresh`, {refreshToken: refreshToken});

                const newAccessToken = response.data.TokenAccess;
                // Guarda el nuevo token
                setAccessToken(newAccessToken);
                // Actualiza el header de autorización en la solicitud original
                originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                // Reintenta la solicitud original con el nuevo token
                return axiosInstance(originalRequest);
            
            }catch(refreshError){

                console.error("No se pudo renovar el Token", refreshError);
                
                return Promise.reject(refreshError);
            }

        }

        return Promise.reject(ProcessError(error));
    }
);

// Procesa respuestas exitosas
const ProcessResponse = (response) => {
    //si el codigo de estado es 200 (Exito)
    if (response?.status === 200) {
        return {IsSuccess: true, data: response.data};
    
    }else {
        // Para otros códigos de estado, se interpreta como fallo
        return {IsFailure: true, status: response?.status, message: response?.msg, code: response?.code };
    }
};

// Proceso de diferentes tipos de errores de red
const ProcessError = (error) => {
    if (error?.response) {
        console.log('Error en la respuesta:', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseError,
            code: error.response.status
        }
    } else if (error.request) {
        console.log('Error en la solicitud:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestError,
            code: ""
        }
    } else {
        console.log('Error desconocido (posible error de red):', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
};

// Objeto donde se definirán dinámicamente las funciones para consumir cada endpoint
const API = {};

// Por cada entrada en SERVICE_URLS, se crea una función correspondiente en el objeto API
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>{
        return axiosInstance({

            method: value.method,   // tipo de petición: GET, POST, etc.
            url: value.url,         // ruta relativa del endpoint (ej, para signup: '/signup')
            data: body,             // cuerpo de la petición (datos enviados)
            responseType: value.responseType,   // tipo de respuesta esperada (json)

            headers: {
                authorization: `Bearer ${getTokenAccess()}`, // token de acceso para autenticación
            },

            TYPE: getType(value, body),

            // Callback para mostrar progreso de subida (si aplica)
            onUploadProgress: (progressEvent) => {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },

            // Callback para mostrar progreso de descarga (si aplica)
            onDownloadProgress: (progressEvent) => {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
    }
}

//Export del objeto API para su uso en otros componentes
export { API };