// Componentes de diseño de Material UI
import { Grid, Box } from '@mui/material';
// Hooks de React
import { useEffect, useState } from "react";
// Herramientas de React Router
import { useSearchParams, Link } from "react-router-dom";
// Funciones para consumir el backend
import { API } from "../../../Servicio/api.js"
// Componente para renderizar una publicación individual
import Post from "./post.jsx";

// Componente principal: Posts
const Posts = () =>{
    // Estado local para almacenar las publicaciones obtenidas del backend
    const [posts, setPosts] = useState([]);
    // Hook para leer parámetros de la URL
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");// Categoría seleccionada (si existe)

    // useEffect para obtener datos al cargar o cambiar la categoría
    useEffect (() => {

        const fetchData = async () =>{

            let response = await API.getAllPosts({ category: category || "" });// Llama a la API con la categoría seleccionada
            console.log("Respuesta del API:", response);

            // Si la respuesta es exitosa, se actualiza el estado con los datos
            if(response.IsSuccess){

                setPosts(response.data);

            }
        }

        fetchData();// Ejecuta la función asíncrona

    }, [category])// Se vuelve a ejecutar si cambia la categoría
    
    // Renderizado del componente
    return(

        <>

        {
            posts && posts.length > 0 ? posts.map(post => (
                // Cada publicación se envuelve en un Link para ver detalles
                <Link to={`/details/${post._id}`} style={{textDecoration: "none", color: "inherit"}}>//link para llevar a la vista individual y detallada de un post
                    <Post post={post} />
                </Link>

            )): (
                // Si no hay datos, se muestra un mensaje de error centrado
                <Box style={{color: "red", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    Sin datos disponibles
                </Box>
            )
        }

        </>
    )

}
// Exporta el componente para su uso externo
export default Posts;