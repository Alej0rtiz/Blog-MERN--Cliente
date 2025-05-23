//imports de Material UI
import { Button, styled, Box, Typography } from "@mui/material"

//import de datos de las categorias
import { Categories } from "../../constantes/data"

import { Link, useSearchParams } from "react-router-dom"

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

const GlassContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
    padding: theme.spacing(4),
    color: "#f1f5f9",
    margin: theme.spacing(4, 0),
    boxSizing: "border-box",
    minHeight: "75vh",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    
}));

const StyledList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
});

const StyledLink = styled(Link)({
    color: "#f1f5f9",
    textDecoration: "none",
    fontWeight: 400,
    fontSize: "1rem",
    position: "relative",
    transition: "all 0.2s ease",

    "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: 0,
    height: "2px",
    backgroundColor: "#24fb6f",
    transition: "width 0.3s ease, left 0.3s ease",
    },

    "&:hover": {
        color: "#24fb6f",
    },

    "&:hover::after": {
    width: "100%",
    left: 0,
    },
});

const CrearButton = styled(Button)(({ theme }) => ({
    marginTop: "2rem",
    width: "100%",
    position: "relative",
    overflow: "hidden", // importante para ocultar el gradiente fuera del botón
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    padding: "12px 0",
    borderRadius: "1rem",
    boxShadow: "0 6px 15px rgba(59, 130, 246, 0.6)",
    transition: "transform 0.5s ease, box-shadow 0.5s ease",
    zIndex: 0,

    "&::before": {
    content: '""',
    position: "absolute",
    width: "150%",
    height: "150%",
    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.15), transparent)",
    top: "-120%",
    left: "-150%",
    transition: "all 0.5s ease",
    zIndex: -1,
    borderRadius: "1rem",
    },

    "&:hover": {
    transform: "scale(1.05) rotate(2deg)",
    boxShadow: "0 0 20px #3b82f650",
    },

    "&:hover::before": {
    top: "100%",
    left: "100%",
    },
}));

const Categorias = () => {

    // Hook para leer parámetros de la URL
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category'); // Obtiene la categoría actual (si existe)

    return(

        <GlassContainer>

            <Typography variant="h6" fontWeight="600" mb={3}>
        Categorías
            </Typography>

            <StyledList>
                <li>
                    <StyledLink to="/">Todas las categorías</StyledLink>
                </li>
                {Categories.map((cat) => (
                    <li key={cat.id}>
                        <StyledLink to={`/?category=${cat.type}`}>{cat.type}</StyledLink>
                    </li>
                ))}
            </StyledList>


            {/* Botón para crear una nueva entrada */}
            <Link to={`/create?category=${category || ''}`}>
            <CrearButton variant="contained">Crear una entrada</CrearButton>
            </Link>
        </GlassContainer>

    )
}

//export del componente para su uso externo
export default Categorias;