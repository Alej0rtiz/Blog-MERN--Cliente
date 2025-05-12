export const getTokenAccess = () => {
    // Obtiene el token de acceso del almacenamiento de sesión
    return sessionStorage.getItem('TokenAccess');
};