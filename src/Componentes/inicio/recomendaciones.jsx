import { Box, Typography, styled } from '@mui/material';

const RecomendacionesContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.15)",       
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
    overflow: "hidden",                             
    padding: theme.spacing(4),                          
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",        
    color: "#e0e7ff",                                  
    margin: theme.spacing(4, 0),                      
    fontSize: "0.875rem",
    boxSizing: "border-box",
    position: "relative",

    "& ul": {
    listStyle: "none",
    paddingLeft: 0,
    minHeight: "55vh",
    marginTop: theme.spacing(1),
    gap: theme.spacing(2),
    },

    "& li": {
    fontSize: "0.875rem",
    lineHeight: 1.4,
    },

    "& a": {
    color: "#90cdf4",
    textDecoration: "none",
    fontWeight: 600,
    transition: "color 0.3s",
    position: "relative",

    "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: 0,
    height: "2px",
    backgroundColor: "#90cdf4",
    transition: "width 0.3s ease, left 0.3s ease",
    },

    "&:hover": {
        color: "#90cdf4",
    },

    "&:hover::after": {
        width: "100%",
        left: 0,
    },
    
}}));

const Recomendaciones = () => {
    return (
    <RecomendacionesContainer component="section" aria-label="Artículos recomendados">
        <Typography component="h2" variant="h6" gutterBottom sx={{ fontWeight: "600", marginBottom: 2 }}>
        Recomendaciones
        </Typography>
        <ul>
        <li>▶️ Articulos recomendados: <a href="https://codelabs.developers.google.com/your-first-webgpu-app?hl=es-419#0" target="_blank" rel="noopener noreferrer" ><strong>Tu primera app de WebGPU</strong></a></li>
        <li>📚 Libro recomendado: <a href="https://math.hws.edu/graphicsbook/" target="_blank" rel="noopener noreferrer" ><em>"Introduction to Computer Graphics"</em></a> de David J.Eck</li>
        <li>👨‍💻 Canal recomendado: <a href="https://www.youtube.com/@midudev" target="_blank" rel="noopener noreferrer"><strong>@midudev</strong></a></li>
        </ul>
    </RecomendacionesContainer>
    );
};

export default Recomendaciones;