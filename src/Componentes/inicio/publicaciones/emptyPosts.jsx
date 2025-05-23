// imports de MUI
import { Box, Typography, styled } from "@mui/material";
// useState para la animación
import { useState } from "react";

// estilos de la vista

const Container = styled(Box)`
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(16px) saturate(180%);
<<<<<<< HEAD
    border: 1px solid rgba(255, 255, 255, 0.2);
=======
    border: 1px solid rgba(233, 182, 73, 0.2);
>>>>>>> main
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin-top: 32px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: sans-serif;
    perspective: 1000px;
`;

const BoxCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
    width: "200px",
    height: "200px",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 1s ease",
    cursor: "pointer",
    marginBottom: "2rem",
    animation: active ? "rotate3d 8s infinite linear" : "none",

    "@keyframes rotate3d": {
        "0%": { transform: "rotateX(0) rotateY(0)" },
        "25%": { transform: "rotateX(90deg) rotateY(90deg)" },
        "50%": { transform: "rotateX(180deg) rotateY(180deg)" },
        "75%": { transform: "rotateX(270deg) rotateY(270deg)" },
        "100%": { transform: "rotateX(360deg) rotateY(360deg)" },
    },
}));

const Face = styled(Box)(({ backgroundcolor }) => ({
    position: "absolute",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",
    fontWeight: "bold",
    fontFamily: "'Fira Code', monospace",
    borderRadius: "12px",
    background: backgroundcolor || "#646cff",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxSizing: "border-box",
    backfaceVisibility: "hidden",
    textAlign: "center",
    overflow: "hidden",

    "&::before": {
        content: '""',
        position: "absolute",
        width: "120%",
        height: "120%",
        background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
        top: "-100%",
        left: "-100%",
        transition: "all 0.5s ease",
    },
    "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
    "&:hover::before": {
        top: "100%",
        left: "100%",
    },
    "&:hover::after": {
        opacity: 1,
    },
}));

// Posición 3D de cada cara
const Front = styled(Face)`
    transform: rotateY(0deg) translateZ(100px);
    background-color: #1e3a8a;
`;
const Back = styled(Face)`
    transform: rotateY(180deg) translateZ(100px);
    background-color: #9333ea;
`;
const Right = styled(Face)`
    transform: rotateY(90deg) translateZ(100px);
    background-color: #0e7490;
`;
const Left = styled(Face)`
    transform: rotateY(-90deg) translateZ(100px);
    background-color: #6b21a8;
`;
const Top = styled(Face)`
    transform: rotateX(90deg) translateZ(100px);
    background-color: #64748b;
`;
const Bottom = styled(Face)`
    transform: rotateX(-90deg) translateZ(100px);
    background-color: #334155;
`;

const EmptyPosts = () => {
    // estado para activar la animación del cubo
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true); // la animación se mantiene activada después del clic
    };

    return (
        <Container>
            <h2 style={{ marginBottom: "60px", fontSize: "1.5rem" }}>
                No se ha publicado nada aún.
            </h2>
        <BoxCard active={active} aria-label="Cubo interactivo de la pagina sin publicaciones" onClick={handleClick}>
        <Front>⚙️ Simulación</Front>
        <Back>🧪 Experimentos</Back>
        <Right>💻 Proyectos</Right>
        <Left>💡 Ideas</Left>
        <Top>📢 Comunidad</Top>
        <Bottom>🧩 Creaciones</Bottom>
        </BoxCard>
        
        <Typography
        variant="h6"
        sx={{ marginTop: 10, textAlign: "center", maxWidth: 300, userSelect: "none" }}
        >
        No hay publicaciones aquí aún... <br />
        ¿Quieres ser el primero en crear una?
        </Typography>
    </Container>
    );
};

// export del componente
export default EmptyPosts;
