//imports Material UI
import { Box, styled, Typography } from '@mui/material';

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
const Hero = styled(Box)`

    margin-top: 0;
    width: 100%;
    min-height: 60vh;
    background: linear-gradient(135deg, #4b0081, #650099, #7f00b2, #ab3ed8, #d86aff);
    background-size: 400% 400%;
    animation: gradientMove 15s ease infinite;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #f5f5f5;
    text-align: center;
    padding: 2rem;

        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
`;

const BlogTitle = styled(Typography)`
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    color: #d8d8d8; // Gris muy claro para BLOG
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
`;

const SubTitle = styled(Typography)`
    font-size: 3rem;
    font-weight: 700;
  color: #ffffff; // Blanco puro para destacar el título principal
    text-shadow: 2px 2px 8px rgba(110, 68, 255, 0.4);
`

//render del componente
const Banner = () => {

    return(
        <Hero>
            <SubTitle>BLOG</SubTitle>
            <BlogTitle>Titulo</BlogTitle>
        </Hero>
    )
}

//export del componente
export default Banner;