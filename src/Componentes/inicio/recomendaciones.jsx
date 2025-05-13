import { Box } from '@mui/material';

//comonente lateral de recomendaciones, con cambios pendientes
// para que se vea bien en la parte derecha de la pantalla
const Recomendaciones = () => {
    return (
    <Box p={2} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
        <h3>Recomendaciones</h3>
        <p>Contenido sugerido...</p>
    </Box>
    );
};

export default Recomendaciones;