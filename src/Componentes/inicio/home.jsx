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

const Background = styled(Box)({
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
    color: 'white',
});


const Home = () => {
    return(
        <Background>
            <Banner />

                {/* Grid principal estilo Holy Grail */}
                <Grid container spacing={2}>
                    {/* Categorías - izquierda */}
                    <Grid item xs={12} sm={3} md={2}>
                    <Categorias />
                </Grid>

                {/* Posts - centro */}
                <Grid item xs={12} sm={6} md={8}>
                    <Posts />
                </Grid>

                {/* Recomendaciones - derecha */}
                <Grid item xs={12} sm={3} md={2}>
                    <Recomendaciones />
                </Grid>
                </Grid>
        </Background>
    )
}

//export del componente para su uso en el enrutamiento o en otros componentes
export default Home