//imports de react
import { useState, useContext, useEffect } from 'react';
//imports de elementos de MUI
import { Box, TextareaAutosize, styled, Button, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import del contexto de la aplicación
import { DataContext } from "../../../contexto/DataProvider.js";
//import del API para llamados a esta
import { API } from "../../../Servicio/api.js";
//import del componente Comentario
import Comment from "./Comentario.jsx";

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

const ComentariosWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: "transparent",
    padding: theme.spacing(4),
    maxWidth: '850px',
    margin: '0 auto',
    marginBottom: '3rem',
    color: '#fff',
}));

const ComentarioInputWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    maxWidth: '91%',
    minWidth: '91%',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'none',
    '&::placeholder': {
        color: '#cbd5e1',
        opacity: 1,
    },
}));

const Usericon = styled(AccountCircleIcon)(({ theme }) => ({

    color: "white",
    fontSize: "2.2rem"

}));

const FeedbackText = styled(Typography)(({ success }) => ({
    color: success ? '#4ade80' : '#f87171',
    fontSize: '0.9rem',
    marginLeft: '1rem',
    marginTop: '0.3rem',
    fontWeight: 500,
    display: "flex",
}));


//valores iniciales
const initialValues = {

    name: "",
    postId:"",
    comments: "",
    date: new Date()

}


export const Comentarios = ({ post }) => {

    //estado para la creacion de un comentario
    const [comentario, setComentario] = useState(initialValues);
    //estado para mostrar la lista de comentarios
    const [comentarios, setComentarios] = useState([]);
    //estado para actualizacion de la lista de estos
    const [toggle, setToggle] = useState(false);
    //estado para mostrar mensajes de confirmacion y error
    const [feedback, setFeedback] = useState({ message: '', success: null });
    //contexto (cuenta autenticada)
    const { account } = useContext(DataContext);


    //useEffect para mostrar los comentarios y actualizar la lista de estos
    useEffect(() => {

        if (!post?._id) {
            console.log("post._id aún no disponible");
            return;
        }

        console.log("Obteniendo comentarios para postId:", post._id);//depuración

        const getData = async () => {
            const response = await API.getComments(post._id);

            if (response.IsSuccess) {

                setComentarios(response.data);

            }

        }
        getData();

    },[post, toggle])

    const handleChange = (e) => {
        setComentario({ ...comentario, name: account.username, postId: post._id, comments: e.target.value });
    }

    //función para añadir un comentario
    const addComment = async (e) => {

        if (!comentario.comments.trim()) {
            setFeedback({ message: '🚫 El comentario no puede estar vacío.', success: false });
            return;
        }

        let response = await API.newComment(comentario);
        if (response.IsSuccess) {
            setComentario(initialValues);
            setFeedback({ message: '✅ Comentario enviado con éxito.', success: true });
        } else {
            console.log("Error al agregar el comentario");
            setFeedback({ message: '🚫 Ocurrió un error al comentar.', success: false });
        }

        setToggle(prevState => !prevState);

    }

    //retorno del componente
    return (

        <ComentariosWrapper>

            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Comentarios
            </Typography>

            <Typography variant="subtitle2" sx={{ color: '#cbd5e1', marginBottom: '1rem' }}>
                {comentarios.length} comentario{comentarios.length !== 1 && 's'}
            </Typography>


            <ComentarioInputWrapper>
            
            <Box display="flex" alignItems="flex-start" gap={2}>
                <Usericon />
                <StyledTextarea
                    minRows={3}
                    placeholder="Escribe un comentario..."
                    value={comentario.comments}
                    onChange={(e) => handleChange(e)}
                />
            </Box>

            <Box display="flex" alignItems="center">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        alignSelf: 'flex-start',
                        '&:hover': {
                            backgroundColor: '#2c3e8c'
                        }
                    }}
                    onClick={(e) => addComment(e)}
                >
                    Comentar
                </Button>

                {feedback.message && (
                        <FeedbackText success={feedback.success}>
                            {feedback.message}
                        </FeedbackText>
                )}
            </Box>

            </ComentarioInputWrapper>

            <Box>
            
            {
                comentarios && comentarios.length > 0 && comentarios.map(comentario => (
                    <Comment comentario={comentario} setToggle={setToggle} />))
            }

            </Box>

        </ComentariosWrapper>

    )

}
//export del componente
export default Comentarios;