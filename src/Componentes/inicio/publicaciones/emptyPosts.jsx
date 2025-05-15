// imports de MUI
import { Box, Typography, styled } from "@mui/material";
// useState para la animación
import { useState } from "react";

const Container = styled(Box)`
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
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
    width: "220px",
    height: "220px",
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
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "600",
    borderRadius: "16px",
    color: "#fff",
    background: backgroundcolor || "#646cff",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.2)",
    backfaceVisibility: "visible",
    transition: "all 0.3s ease",
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

const Front = styled(Face)`
    transform: translateZ(110px);
    background-color: #6a8eff;
`;
const Back = styled(Face)`
    transform: translateZ(-110px) rotateY(180deg);
    background-color: #00acc1;
`;
const Right = styled(Face)`
    transform: translateX(110px) rotateY(90deg);
    background-color: #43a047;
`;
const Left = styled(Face)`
    transform: translateX(-110px) rotateY(-90deg);
    background-color: #e91e63;
`;
const Top = styled(Face)`
    transform: translateY(-110px) rotateX(90deg);
    background-color: #ffb300;
`;
const Bottom = styled(Face)`
    transform: translateY(110px) rotateX(-90deg);
    background-color: #8e24aa;
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

            <BoxCard active={active} onClick={handleClick}>
                <Front>🌟</Front>
                <Back>🧠</Back>
                <Right>🎉</Right>
                <Left>💡</Left>
                <Top>📢</Top>
                <Bottom>⚙️</Bottom>
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
