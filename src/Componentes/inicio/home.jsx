// Componente funcional Home que representa la vista principal tras el inicio de sesión

//imports de Material UI
import { Grid } from "@mui/material"

//import de componentes
import Banner from "../Banner/banner"
import Categorias from "./categories"

const Home = () => {
    return(
            <>
            {/* Banner superior de la página */}
            <Banner />
            {/* Contenedor principal que organiza el layout en un grid */}
            <Grid container>
                {/* Sección lateral de categorías */}
                <Grid item lg={2} sm={2} xs={12}>
                    <Categorias />
                </Grid>
                {/* Sección principal donde se mostrarán las publicaciones */}
                <Grid container item xs={12} sm={10} lg={10}>
                    {/* Aquí se renderizarán los posts */}
                    Posts
                </Grid>
            </Grid>
            </>
    )
}

//export del componente para su uso en el enrutamiento o en otros componentes
export default Home