//imports Material UI
import {Drawer, AppBar, Toolbar, styled, Box, Typography, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Paper } from "@mui/material";
//imports de iconos de Material UI
import { Menu as MenuIcon } from "@mui/icons-material";
//imports de react-router-dom
import { Link } from 'react-router-dom';
//imports de react
import { useState } from "react";
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

//Pendiente solucionar esto para los estilos del drawer
const GlassPaper = styled(Paper)(({ theme }) => ({
    
    backgroundColor: "rgba(15, 23, 42, 0.8) !important",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    width: "60vw",
    maxWidth: 280,
    paddingTop: "24px",

}));

const DrawerLinkList = styled(List)({
    width: "100%",
});

const DrawerLinkItem = styled(ListItem)({
    color: "#fff",
    padding: "1.2rem 1.5rem",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
});

const DrawerLinkText = styled(ListItemText)({
    '& span': {
    fontSize: "1.1rem",
    fontWeight: 500,
    }
});


const Header = () =>{

    const [open, setOpen] = useState(false);

    return(
        <GlassAppBar elevation={0}>
            <NavContainer>
                <Brand variant="h6">DevSim Blog</Brand>
                <NavLinks>
                    <StyledLink to={'/'}>Inicio</StyledLink>
                    <StyledLink to={'/Profile'}>Perfil</StyledLink>
                    <StyledLink to={'/Login'}>Cerrar sesion</StyledLink>
                </NavLinks>

                {/* Botón para menú móvil (solo visible en pantallas pequeñas) */}
                <IconButton edge="end" sx={{ display: { md: "none" }, color: "#fff", marginRight: "25px" }} onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
                    {/* arreglar estilos pendientes */}
                    <Drawer anchor="right" open={open} onClose={() => setOpen(false)} slotProps={{ component: GlassPaper}}>

                        <DrawerLinkList>
                            {[
                                { text: "Inicio", to: "/" },
                                { text: "Perfil", to: "/Profile" },
                                { text: "Cerrar sesión", to: "/Login" },
                            ].map(({ text, to }, index) => (
                                <DrawerLinkItem button key={index} component={Link} to={to} onClick={() => setOpen(false)}>
                                    <DrawerLinkText primary={text} />
                                </DrawerLinkItem>
                                ))}
                        </DrawerLinkList>
                    </Drawer>

            </NavContainer>
        </GlassAppBar>
    )
}

export default Header;