// Componente funcional Home que representa la vista principal tras el inicio de sesión

//imports de Material UI
import { Grid, Box, styled } from "@mui/material"

//import de componentes
import Banner from "../Banner/banner"
import Categorias from "./categories"
import Recomendaciones from "./recomendaciones"
import Posts from "./publicaciones/posts"

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

const Background = styled('div')({
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
    color: 'white',
});

const MainGrid = styled('main')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',           
    gap: theme.spacing(3),                
    maxWidth: '112rem',                   
    margin: 'auto',
    padding: theme.spacing(2, 4),       

    
    [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)', 
    },
}));


const Home = () => {
    return(
        <Background>
            <Banner />

                <MainGrid>
                {/* Grid principal estilo Holy Grail */}

                    {/* Categorías - izquierda */}
                    <Box component="aside" aria-label="Sección de categorías" sx={{ gridColumn: { lg: 'span 1' } }}>
                        <Categorias />
                    </Box>

                    {/* Posts - centro */}
                    <Box component="section" aria-label="Sección principal de publicaciones" sx={{ gridColumn: { lg: 'span 2' } }}>
                        <Posts />
                    </Box>

                    {/* Recomendaciones - derecha */}
                    <Box component="aside" aria-label="Sección de recomendaciones" sx={{ gridColumn: { lg: 'span 1' } }}>
                        <Recomendaciones />
                    </Box>

            </MainGrid>
        </Background>
    )
}

//export del componente para su uso en el enrutamiento o en otros componentes
export default Home