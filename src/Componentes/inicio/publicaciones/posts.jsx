// Componentes de diseño de Material UI
import { MenuItem, Select, FormControl, InputLabel, styled, Box } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
// Hooks de React
import { useEffect, useState } from "react";
// Herramientas de React Router
import { useSearchParams, Link } from "react-router-dom";
// Funciones para consumir el backend
import { API } from "../../../Servicio/api.js"
// Componente para renderizar una publicación individual
import Post from "./post.jsx";
import EmptyPosts from './emptyPosts.jsx';

//estilos

const SelectContainer = styled(FormControl)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
    margin: theme.spacing(4, 0, 0, 0),
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    padding: theme.spacing(1.5),
    minWidth: 200,
    maxHeight: 30,
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
    },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    color: "#fff",
    fontWeight: 500,
    backgroundColor: "transparent",
    padding: "6px 12px",
    minHeight: "30px",
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
    "& .MuiSelect-icon": {
        color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
}));

const StyledLabel = styled(InputLabel)(({ theme }) => ({
    color: "#e5e7eb",
    fontWeight: 500,
    fontSize: "0.9rem",
    marginBottom: theme.spacing(0.5),
    "&.Mui-focused": {
        color: "#fff",
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: "#e5e7eb",
    backgroundColor: "transparent",
    "&.Mui-selected": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        color: "#fff",
    },
    "&.Mui-selected:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}));

const SelectWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    transition: "color 0.3s ease",

    "&:hover .sort-icon": {
        color: "#24fb6f"
    }
}));

const StyledSortIcon = styled(SortIcon)(({ theme }) => ({
    color: "#e5e7eb",
    fontSize: "2rem",
    marginTop: "32px",
    transition: "color 0.3s ease",
}));

// Componente principal: Posts
const Posts = () =>{
    // Estado local para almacenar las publicaciones obtenidas del backend
    const [posts, setPosts] = useState([]);
    // Hook para leer parámetros de la URL
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");// Categoría seleccionada (si existe)

    const sort = searchParams.get("sort") || "newest";//orden por fecha 

    // useEffect para obtener datos al cargar o cambiar la categoría
    useEffect (() => {

        const fetchData = async () =>{

            let response = await API.getAllPosts({ category: category || "", sort: sort || "" });// Llama a la API con la categoría seleccionada
            console.log("Respuesta del API:", response);

            // Si la respuesta es exitosa, se actualiza el estado con los datos
            if(response.IsSuccess){

                setPosts(response.data);

            }
        }

        fetchData();// Ejecuta la función asíncrona

    }, [category, sort])// Se vuelve a ejecutar si cambia la categoría

    //funcion para actualizar el parametro "sort"
    const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (selectedSort) {
        newParams.set("sort", selectedSort);
    } else {
        newParams.delete("sort");
    }

    setSearchParams(newParams); // Esto actualiza y dispara useEffect automáticamente
    };
    
    // Renderizado del componente
    // Cada publicación se envuelve en un Link para ver detalles
    // Si no hay datos, se muestra un mensaje de error centrado
    //con links que llevan a la vista individual de cada post
    return(

        <>
            {/* Filtro de orden */}
        <SelectWrapper>
            <StyledSortIcon className="sort-icon" />

            <SelectContainer variant="outlined">

                    <StyledLabel id="sort-label" shrink={true}>Ordenar por</StyledLabel>

                    <StyledSelect
                    labelId="sort-label"
                    label="Ordenar por"
                    value={sort || ""}
                    onChange={handleSortChange}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                            backgroundColor: "#0f172a",
                            color: "#e5e7eb",
                            borderRadius: 2,
                            mt: 1,
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                            }}}}>

                        <StyledMenuItem value="newest">Más recientes</StyledMenuItem>
                        <StyledMenuItem value="oldest">Más antiguos</StyledMenuItem>

                    </StyledSelect>

            </SelectContainer>
        </SelectWrapper>

        {/*Lista de publicaciones*/}
        {
            posts && posts.length > 0 ? posts.map(post => (
                
                <Link to={`/details/${post._id}`} aria-label={`Ver detalles de la publicación: ${post.title || 'sin título'}`} style={{textDecoration: "none", color: "inherit"}}>
                    <Post post={post} key={post._id}/>
                </Link>

            )): (
                
                <EmptyPosts/>

            )
        }

        </>
    )

}
// Exporta el componente para su uso externo
export default Posts;