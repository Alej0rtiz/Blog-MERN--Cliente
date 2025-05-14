//imports Material UI
import { Box, styled, Typography } from '@mui/material';

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
const Hero = styled(Box)`

    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    overflow: hidden;
    background-image: url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
    background-size: cover;
    background-position: center;

    &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(270deg, rgba(59,130,246,0.4), rgba(236,72,153,0.4), rgba(34,197,94,0.4));
    background-size: 600% 600%;
    animation: gradientShift 15s ease infinite;
    }

    @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
    }
`;

const HeroContent = styled(Box)`
    position: relative;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1.5rem;
    padding: 2rem;
    max-width: 700px;
`;

const BlogTitle = styled(Typography)`
    font-size: 1.25rem;
    color: #e2e8f0;
    margin-top: 1rem;

    @media (min-width: 768px) {
    font-size: 1.5rem;
    }
`;

const SubTitle = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    
    @media (min-width: 768px) {
    font-size: 3.5rem;
    }
`

//render del componente
const Banner = () => {

    return(
        <Hero>
            <HeroContent>
                <SubTitle>Bienvenido a DevSim Blog</SubTitle>
                <BlogTitle>Explora artículos sobre desarrollo, simulación y más</BlogTitle>
            </HeroContent>
        </Hero>
    )
}

//export del componente
export default Banner;