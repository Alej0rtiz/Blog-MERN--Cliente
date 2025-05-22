//import de contexto de react
import { useContext } from "react";
//imports de elementos de MUI (e iconos)
import { Box, styled, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
//imports del contexto de la aplicación
import { DataContext } from "../../../contexto/DataProvider.js";
//import para llamado al API
import { API } from "../../../Servicio/api.js"

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
const CommentBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#1e293b',
    padding: theme.spacing(2),
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
    border: '1px solid #334155',
}));

const CommentHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
}));

const AuthorDate = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

const CommentText = styled(Typography)(({ theme }) => ({
    color: '#e2e8f0',
    fontSize: '0.95rem',
}));

const DeleteIcon = styled(Delete)`
    color: #94a3b8;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: #fa8072;
    }
`;

const Comment = ({ comentario, setToggle }) => {

    const { account } = useContext(DataContext);

    //funcion para eliminar el comentario y actualizar la lista de estos
    const DeleteComment = async () =>{

        let response = await API.deleteComment(comentario._id);

        if(response.IsSuccess){
            setToggle(prevState => !prevState);
        }

    }
    //retorno del compoente
    return(
        <CommentBox>
            
            <CommentHeader>
                <AuthorDate>
                    <Typography variant="subtitle2" color="#f1f5f9">{comentario.name}</Typography>
                    <Typography variant="caption" color="#94a3b8">{new Date(comentario.date).toDateString()}</Typography>
                </AuthorDate>
                { comentario.name === account.username && < DeleteIcon onClick={() => DeleteComment()} /> }

            </CommentHeader>

                <Typography>{comentario.comments}</Typography>

        </CommentBox>
    )

}

export default Comment;