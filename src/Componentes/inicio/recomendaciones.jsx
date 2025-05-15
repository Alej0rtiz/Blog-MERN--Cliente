import { Box, Typography, styled } from '@mui/material';

const RecomendacionesContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.15)",       
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",                             
    padding: theme.spacing(4),                          
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",        
    color: "#e0e7ff",                                  
    margin: theme.spacing(4, 0),                      
    fontSize: "0.875rem",
    boxSizing: "border-box",
    "& ul": {
    listStyle: "none",
    paddingLeft: 0,
    minHeight: "75vh",
    marginTop: theme.spacing(1),
    gap: theme.spacing(2),
    },
    "& li": {
    fontSize: "0.875rem",
    lineHeight: 1.4,
    },
}));

const Recomendaciones = () => {
    return (
    <RecomendacionesContainer>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "600", marginBottom: 2 }}>
        Recomendaciones
        </Typography>
        <ul>
        <li>▶️ Tutorial destacado: <strong>Simulación con Unity</strong></li>
        <li>📚 Libro recomendado: <em>"Artificial Intelligence: A Modern Approach"</em></li>
        <li>👨‍💻 Usuario activo: <strong>@simulador3000</strong></li>
        </ul>
    </RecomendacionesContainer>
    );
};

export default Recomendaciones;