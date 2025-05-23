// Imports de MUI y React
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import del servicio del API
import { API } from "../../Servicio/api.js";
//import del contexto para mostrar las opciones de edicion y eliminación solo a usuarios debidos
import { DataContext } from "../../contexto/DataProvider.js";

//import del componentes de comentarios
import Comentarios from "./Comentarios/Comentarios.jsx";

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

const GlassCard = styled(Box)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: theme.shape.borderRadius * 4,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3],
    transition: "all 0.3s ease",
    "&:hover": {
    boxShadow: theme.shadows[6],
    },
    margin: '2rem auto',
    marginTop: "20vh",
    maxWidth: '850px'
}));

const PostImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius * 2,
    marginBottom: theme.spacing(2),
}));

const PostTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: "#fff",
    wordBreak: "break-word"
}));

const MetaInfo = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2),
    fontSize: "0.85rem",
    color: "#94a3b8",
    marginBottom: theme.spacing(2),
}));

const PostContent = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.85)",
    marginBottom: theme.spacing(1),
    wordBreak: "break-word"
}));

const IconLink = styled(Link)(({ theme }) => ({

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    background: "transparent",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    margin: "0 5px",
    padding: "6px",
    borderRadius: "6px",
    transition: "background 0.2s ease",

    "&:hover": {
        background: "rgba(255, 255, 255, 0.08)", //sutil y visible
    },
}));

const EditIcon = styled(Edit)`

    color: white;
    flexDirection: row;

`

const DeleteIcon = styled(Delete)`
    color: white;
    flex-direction: row;
    transition: color 0.2s ease;

    &:hover {
    color: #fa8072;
    }
`;


//componente principal

const PostDetallado = () =>{

    // Estado para almacenar los datos del post
    const [post, setPost] = useState({});

    // Obtiene el ID del post desde los parámetros de la URL
    const {id} = useParams();

    // Obtiene los datos del usuario autenticado desde el contexto
    const { account } = useContext(DataContext);

    //navigación entre rutas
    // Hook para la navegación entre rutas
    const navigate = useNavigate();

    // Hook useEffect para obtener los datos del post desde la API al cargar el componente
    useEffect(() => {

        const fetchData = async () => {
            
                let response = await API.getPostById(id);

                if (response.IsSuccess) {

                    setPost(response.data);

                } else {
                    console.error("Error al obtener el post:", response.message);
                }

        }
        fetchData()
    }, []) // Dependencias vacías: solo se ejecuta al montar el componente (sujeto a cambios)

    //función para eliminar el post actual
    const deletePost = async () => {

        let response = await API.deletePost(post._id);

        if (response.IsSuccess) {
            navigate('/'); // Redirige a la página principal después de eliminar
        }
    }


    return(
    <>
        <GlassCard>
            {/* Imagen del post si es que existe */}
            {post.picture && (<PostImage src={post.picture} 
            alt="Post Detallado" />)}
        
            <Box style={{float: 'right'}}>

                {
                    account.username === post.username &&

                    <>
                    {/* Pendiente estilizacion y funcionalidades + componente de actualizacion de post */}
                        <IconLink to={`/edit/${post._id}`}>
                            <EditIcon />
                        </IconLink>
                        <IconLink>
                            <DeleteIcon onClick={() => deletePost()} />
                        </IconLink>
                    </>
                }

            </Box>
            {/* Título del post */}
            <PostTitle>{post.title}</PostTitle>

                {/* Información del autor y fecha de creación */}
            <MetaInfo>
                <Typography>{post.username}</Typography>
                <Typography>{new Date(post.creationDate).toDateString()}</Typography>
            </MetaInfo>

            {/* Contenido del post */}
            <PostContent>{post.description}</PostContent>
        
        </GlassCard>

        {/* Sección de comentarios */}
        <Comentarios post={post} />

    </>
    )

}

//export del componente
export default PostDetallado;