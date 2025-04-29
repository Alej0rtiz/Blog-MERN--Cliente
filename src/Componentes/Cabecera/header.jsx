//imports Material UI
import { AppBar, Toolbar, styled, Typography } from "@mui/material";

//
import { Link } from 'react-router-dom';

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
const Component = styled(AppBar)`
    background: linear-gradient(90deg, #4b0081 0%, #650099 35%, #7f00b2 65%, #ab3ed8 100%);
    color: #f5f5f5;
    boxShadow: 0 4px 10px rgba(0,0,0,0.2);
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: inherit;
        text-decoration: none;
    }
`;

const Header = () =>{

    return(
        <Component>
            <Container>
                
                <Link to={'/Home'}>Inicio</Link>
                <Link to={'/Profile'}>Perfil</Link>
                <Link to={'/Login'}>Cerrar sesion</Link>

            </Container>
        </Component>
    )
}

export default Header;