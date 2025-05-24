// Imports de MUI y React
import { Box, Typography, Snackbar, Alert, styled, Modal, IconButton } from "@mui/material";
import { Edit, Delete, Share as ShareIcon } from "@mui/icons-material";
//icono de cierre para modal de imagenes
import CloseIcon from '@mui/icons-material/Close';
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

const ImgContainer = styled(Box)(({ theme }) => ({
    
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    maxHeight: "80vh",
    maxWidth: "80vw",
    bgcolor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

}));

const FullImg = styled('img')(({ theme }) => ({
    
    maxHeight: "80vh",
    maxWidth: "80vw",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    display: "block"

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
        background: "rgba(255, 255, 255, 0.08)",
    },
}));

const BotonIcon = styled(IconButton)(({ theme }) => ({

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
        background: "rgba(255, 255, 255, 0.08)",
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

const ShareIconStyled = styled(ShareIcon)`
    color: white;
    cursor: pointer;
    flex-direction: row;
    transition: color 0.3s ease;

    &:hover {
        color: rgb(36, 251, 111);
    }
`;

const CloseIc = styled(CloseIcon)`

    color: white;
    flexDirection: row;

`


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

    // Estado para controlar el mensaje de "copiado"
    const [copied, setCopied] = useState(false);

    // Estado para detectar si es móvil
    const [isMobile, setIsMobile] = useState(false);

    //estado para abrir y cerrar la imagen de un post
    const [imageOpen, setImageOpen] = useState(false);
    //funciones para abrir y cerrar la imagen de un post
    const handleOpenImage = () => setImageOpen(true);
    const handleCloseImage = () => setImageOpen(false);


    useEffect(() => {
    // Detectar dispositivo móvil
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
        setIsMobile(true);
    }}, []);

      // Función para copiar al portapapeles
    const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
    
    }).catch(() => {
      // fallback si clipboard API falla
        alert("No se pudo copiar el enlace. Por favor, copialo manualmente.");
    })};

    const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
    return; // para no cerrarlo si el usuario hace click fuera
    }
    setCopied(false);
    };

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
            {post.picture && (
                
                <>
                    <PostImage src={post.picture} alt="Post Detallado" onClick={handleOpenImage} style={{ cursor: "pointer" }} />
                
                    <Modal open={imageOpen} onClose={handleCloseImage}>

                        <ImgContainer>

                            <Box sx={{position: "relative", display: "inline-block",}}>

                                {/* Botón de cerrar */}
                                <BotonIcon aria-label="Cerrar imagen ampliada" onClick={handleCloseImage} sx={{marginBottom: 1}}>
                                    <CloseIc />
                                </BotonIcon>

                                {/* Imagen ampliada */}
                                <FullImg src={post.picture} alt="Imagen ampliada" />

                            </Box>

                        </ImgContainer>

                    </Modal>
                </>
            )}
        
            <Box style={{float: 'right'}}>

                {
                    account.username === post.username && (

                    <>
                        <IconLink to={`/edit/${post._id}`}>
                            <EditIcon aria-label="Copiar enlace del post"/>
                        </IconLink>
                        <IconLink>
                            <DeleteIcon aria-label="Eliminar post" onClick={() => deletePost()} />
                        </IconLink>
                    </>
                )}

                {!isMobile && (
                    <BotonIcon>
                    <ShareIconStyled aria-label="Copiar enlace del post" onClick={handleCopyLink} />
                    </BotonIcon>
                )}
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

        {/* Snackbar para mensaje copiado */}
        <Snackbar
            open={copied}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>

            <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
            ¡Enlace copiado!
            </Alert>
        </Snackbar>

    </>
    )

}

//export del componente
export default PostDetallado;