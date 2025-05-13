//---------------------------------------------
// Funciones utilitarias generales
//---------------------------------------------


export const getTokenAccess = () => {
    // Obtiene el token de acceso del almacenamiento de sesión
    return sessionStorage.getItem('TokenAccess');
};

export const addEllipsis = (text, maxLength) => {
    //agrega puntos suspensivos al texto si excede la longitud máxima
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

//Determina el tipo de estructura a enviar al backend según el tipo de endpoint.
export const getType = (value, body) => {
    if (value.params) {
        // Si el endpoint requiere parámetros, se extraen del cuerpo de la petición
        return {params: body};
    
    }else if (value.query){
        if (typeof body === 'object'){

            return { query : body._id }

        }else{

            return { query: body }

        }
    }
    // Si no se requiere ni params ni query, retorna un objeto vacío.
    return{};
};