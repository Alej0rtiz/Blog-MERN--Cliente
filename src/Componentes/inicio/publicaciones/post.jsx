// Componentes de diseño de Material UI
import { Box, Typography, styled } from "@mui/material";
// Función utilitaria para cortar texto largo con puntos suspensivos
import { addEllipsis } from "../../../utilidades/common";

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

// Contenedor principal para cada publicación
const PostContainer = styled(Box)(({ theme }) => ({

    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
    margin: "32px 22px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    padding: theme.spacing(3),
    transition: "all 0.3s ease",
    "&:hover": {
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
    }
}));

const PostImage = styled("img") ({
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
});

const PostTitle = styled(Typography)(({ theme }) => ({

    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),

}));

const PostDescription = styled(Typography)(({ theme }) => ({

    fontSize: "0.9rem",
    color: "#e5e7eb",
    marginBottom: theme.spacing(1),

}));

const PostMeta = styled(Typography)(({ theme }) => ({

    fontSize: "0.75rem",
    fontStyle: "italic",
    color: "#cbd5e1",

}));

// Componente funcional: Post
const Post = ({post}) => {
    return (
        <PostContainer>
            {/* Muestra imagen si existe en el post */}
            {post.picture && (
                <PostImage src={post.picture} alt="imagen de entrada del post" />
            )}

            {/* Muestra la categoría (decodificada por si viene codificada en la URL) */}
            <PostMeta>{decodeURIComponent(post.categories)}</PostMeta>
            {/* Título del post */}
            <PostTitle>{addEllipsis(post.title, 45)}</PostTitle>
            {/* Nombre de usuario del autor */}
            <PostMeta>{post.username}</PostMeta>
            {/* descripcion de creación del post */}
            <PostDescription>{addEllipsis(post.description, 100)}</PostDescription>
        </PostContainer>
    )
}

// Exporta el componente para su uso externo
export default Post;