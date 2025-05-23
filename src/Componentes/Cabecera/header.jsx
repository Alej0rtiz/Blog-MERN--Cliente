//imports Material UI
import {Drawer, AppBar, Toolbar, styled, Box, Typography, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import { Paper } from "@mui/material";
//imports de iconos de Material UI
import { Menu as MenuIcon } from "@mui/icons-material";
//imports de react-router-dom
import { Link, useNavigate } from 'react-router-dom';
//imports de react
import { useState } from "react";

import { setAccessToken,setRefreshToken, getRefreshToken } from "../../utilidades/common";

import { API } from "../../Servicio/api";
//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
const GlassAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    WebkitBackdropFilter: "blur(12px)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    padding: "0.5rem 1.5rem",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1100,
}));

const NavContainer = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 0,
});

const Brand = styled(Typography)({
    fontWeight: "bold",
    fontSize: "1.5rem",
});

const NavLinks = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
    [theme.breakpoints.down("md")]: {
    display: "none",
    },
}));


const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.25rem 0.5rem",
    transition: "opacity 0.2s ease",
    "&:hover": {
    textDecoration: "underline",
    },
});


const GlassPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(30, 41, 59, 0.95) !important",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: 0,
    width: "60vw",
    maxWidth: 280,
    paddingTop: "24px",
}));

const DrawerLinkList = styled(List)({
    width: "100%",
});

const DrawerLinkItem = styled(ListItem)({
    color: "#f8fafc",
    padding: "1.2rem 1.5rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
});

const DrawerLinkText = styled(ListItemText)({
    '& span': {
        fontSize: "1.05rem",
        fontWeight: 500,
        color: "#f1f5f9",
    }
});

const LogoutButton = styled(Button)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    marginRight:"10px",
    backgroundColor: "#ef4444",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    padding: "6px 16px",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 10px rgba(239, 68, 68, 0.4)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    fontSize: "0.9rem",
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
        borderRadius: "inherit",
    },

    "&:hover": {
        animation: "shake 0.5s ease-in-out",
        boxShadow: "0 0 12px rgba(239, 68, 68, 0.5)",
    },

    "&:hover::before": {
        top: "100%",
        left: "100%",
    },

    "@keyframes shake": {
    "0%, 100%": { transform: "translateX(0) scale(1.03)" },
    "25%": { transform: "translateX(-1px) scale(1.03)" },
    "75%": { transform: "translateX(1px) scale(1.03)" },
        }
    }));

export const LogoutWrapper = styled(Box)`
    position: relative;
`;

export const ConfirmationBox = styled(Box)`
    position: absolute;
    top: 120%;
    right: 0;
    margin-right: 12px;
    margin-top: 2px;
    background-color: rgba(126, 141, 165, 0.46);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(126, 141, 165, 0.46);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    z-index: 999;
    color: #fff;
    min-width: 200px;
`;

export const ConfirmText = styled(Typography)`
    color: #fff;
`;

export const ButtonsContainer = styled(Box)`
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
`;

export const ConfirmButton = styled(Button)`
    background-color: #ef4444;
    color: white;
    &:hover {
    background-color: #dc2626;
    }
`;

export const CancelButton = styled(Button)`
    background-color:rgb(85, 119, 167);
    color: white;
    &:hover {
    background-color:rgb(64, 88, 126);
    }
`;


const Header = () =>{

    const [open, setOpen] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setConfirmLogout(true); // Mostrar confirmación
    };

    const confirmLogoutAction = async () => {
        try {
            const response = await API.logoutUser({ refreshToken: getRefreshToken() });
            if (response?.IsSuccess) {
                // Limpia tokens del localStorage
                setAccessToken('');
                setRefreshToken('');
                // Redirige al login
                navigate('/login');
            }
        } catch (error) {
            console.error("Error cerrando sesión", error);
        }
    };

    const cancelLogout = () => {
        setConfirmLogout(false);
    };

    return(
        <GlassAppBar elevation={0}>
            <NavContainer>
                <Brand component="h1" variant="h6">DevSim Blog</Brand>

                {/*Version de escritorio*/}
                <NavLinks>
                    <StyledLink to={'/'}>Inicio</StyledLink>
                    <StyledLink to={'/Profile'}>Perfil</StyledLink>
                    <LogoutWrapper>
                        <LogoutButton onClick={handleLogoutClick} size="small">
                            Cerrar sesión
                        </LogoutButton>
                        {confirmLogout && (
                            <ConfirmationBox>
                                <ConfirmText variant="body2">¿Confirmar cierre de sesión?</ConfirmText>
                                <ButtonsContainer>
                                <ConfirmButton onClick={confirmLogoutAction} size="small">Sí</ConfirmButton>
                                <CancelButton onClick={cancelLogout} size="small">No</CancelButton>
                                </ButtonsContainer>
                            </ConfirmationBox>
                        )}
                    </LogoutWrapper>
                </NavLinks>

                {/* Botón para menú móvil (solo visible en pantallas pequeñas) */}
                <IconButton aria-label="Abrir menú de navegación"
                    edge="end"
                    sx={{ display: { md: "none" }, color: "#fff", marginRight: "25px" }}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* Drawer móvil */}
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{
                        component: GlassPaper, role: "navigation", 'aria-label': "Menú de navegación"}}
                >
                    <DrawerLinkList>
                    {[
                        { text: "Inicio", to: "/" },
                        { text: "Perfil", to: "/Profile" },
                        { text: "Cerrar sesión", action: handleLogoutClick },
                        ].map(({ text, to, action }, index) => (
                        <DrawerLinkItem
                            key={index}
                            component={to ? Link : 'div'}
                            to={to || undefined}
                            onClick={() => {
                                if (action) {
                                    action();
                                } else {
                                    setOpen(false);
                                }}}
                        >
                            <DrawerLinkText primary={text} />
                        </DrawerLinkItem>
                    ))}
                    </DrawerLinkList>
                
                    {/* Confirmación dentro del Drawer */}
                    {confirmLogout && (
                        <Box px={2} pb={2}>
                            <ConfirmText variant="body2">¿Confirmar cierre de sesión?</ConfirmText>
                            <ButtonsContainer>
                                <ConfirmButton onClick={confirmLogoutAction} size="small">Sí</ConfirmButton>
                                <CancelButton onClick={cancelLogout} size="small">No</CancelButton>
                            </ButtonsContainer>
                        </Box>
                    )}
                </Drawer>

            </NavContainer>
        </GlassAppBar>
    )
}

export default Header;