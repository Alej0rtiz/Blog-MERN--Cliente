//imports de react
import { useState, useEffect, useContext } from "react"; 

//imports Material UI
import { Box, Button, FormControl, InputBase, TextareaAutosize, styled, Typography } from "@mui/material";
import { AddCircle as Add } from '@mui/icons-material';

//imports React Router
import { useNavigate, useLocation } from 'react-router-dom';

//import del contexto global para obtener al usuario autenticado
import { DataContext } from "../../contexto/DataProvider";

//import de API
import { API } from '../../Servicio/api'

import defaultImage from '../../assets/default-post-img.png';// Imagen por defecto para el post

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

const Container = styled(Box)(({ theme }) => ({
    paddingTop: '100px',
    paddingLeft: '16px',
    paddingRight: '16px',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
}));

const FormCard = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '720px',
    padding: '32px',
    marginBottom: "15vh",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    color: '#fff',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: '100%',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#fff',

    '& input': {
        color: '#fff',
            '&::placeholder': {
                color: '#cbd5e1',
                opacity: 1,
            },
        },
}));

const UploadIconWrapper = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#f1f5f9',
    borderRadius: '50%',
    padding: '8px',
    transition: 'background 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(79, 44, 235, 0.27)',
    },
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    marginTop: theme.spacing(2),
    maxWidth: '96%',
    minWidth: '96%',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'inherit',

    '&::placeholder': {
    color: '#cbd5e1',
    opacity: 1,
    },
}));

const UploadLabel = styled('label')({
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    }
);

const StyledButton = styled(Button)({
    marginTop: '24px',
    width: '100%',
    backgroundColor: '#3b82f6',
    '&:hover': {
    backgroundColor: '#2563eb',
    },
    color: '#fff',
    padding: '12px',
    fontWeight: 'bold',
    borderRadius: '12px',
});

const ImagePreview = styled('img')({
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '16px',
});

//---------------------------------------------
// Valores iniciales para el formulario de los posts
//---------------------------------------------
const PostInitVals = {

    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    creationDate: new Date(),

}

//componente principal
const CreatePost = () => {

    const location = useLocation();  // Obtiene la categoría desde la URL

    const [post, setPost] = useState(PostInitVals); // Estado del post
    const [file, setFile] = useState('');   // Estado del archivo subido

    const { account } = useContext(DataContext);    // Usuario autenticado

    const navigate = useNavigate(); // Navegación entre rutas

    // Estado para los errores de validación
    const [errors, setErrors] = useState({ title: false, description: false });

    // URL de la imagen cargada (puede servir para mostrarla en un preview)
    const url = post.picture ? post.picture : defaultImage;

    // useEffect para manejar la carga de la imagen al seleccionar un archivo
    useEffect(() => {

        const getImage = async () =>{
            if(file) {
                console.log(file)
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                try {
                    //llamado al API
                // Subida del archivo a través del API
                const response = await API.uploadFile(data);
                post.picture = response.data.url;
                } catch (error) {
                    console.error("Error en la carga de archivo:", error);
                }
            }
        }
        getImage();
        
        // Se actualizan campos relacionados al usuario y categoría

        const queryCategory = location.search?.split('=')[1] || 'All';

        post.categories = decodeURIComponent(queryCategory); // Decodifica la categoría de la URL para evitar problemas con caracteres especiales
        post.username = account.username;
    }, [file]);

     //funcion Maneja el cambio de los campos del formulario
    const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })

    // Al escribir, elimina el error de ese campo si existía
    setErrors(prev => ({ ...prev, [e.target.name]: false }));
}

    const validate = () => {
        const newErrors = {
            title: post.title.trim() === '',
            description: post.description.trim() === '',
            };

        setErrors(newErrors);
        // Retorna true si no hay errores (todos false)
        return !Object.values(newErrors).some(err => err === true);
        }


    const savePost = async () => {
        
        if (!validate()) return; // Si falla validación, no continuar

        let response = await API.createPost(post);//llamado al API para el guardado
            navigate('/'); // Redirige a la página principal después de crear el post

    }

        // =========================
        // RENDERIZADO DEL FORMULARIO
        // =========================


    return(
        <Container>
            <FormCard>
            
                <ImagePreview 
                src={url} 
                alt="preview" />

                <FormControl fullWidth>

                <UploadLabel htmlFor="fileInput">
                    <UploadIconWrapper>
                        <Add fontSize="large" sx={{ color: '#f1f5f9' }} />
                    </UploadIconWrapper>
                    <span style={{ color: '#f1f5f9', fontSize: '0.9rem', fontWeight: 'normal', cursor: 'Pointer' }}>
                        Subir una imagen
                    </span>
                </UploadLabel>
                {/* Botón de subir archivo (oculto), activado al hacer clic en el ícono */}
                <input type="file" id="fileInput" style={{ opacity: 0, width: 0, height: 0, position: 'absolute', zIndex: -1, }} onChange={(e) => setFile(e.target.files[0])}/>

                {/* Campo para el título del post */}
                <StyledInput placeholder="Titulo del post" onChange={(e) => handleChange(e)} name="title"/>

                {errors.title && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, fontWeight: "bold" }}>
                        ⛔ El titulo es obligatorio
                    </Typography>
                )}

                {/* Área de texto para la descripción del post */}
                <StyledTextarea minRows={5} placeholder="Comparte tu trabajo..." onChange={(e) => handleChange(e)} name="description"/>
                
                {errors.description && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                        ⛔ La descripción es obligatoria
                    </Typography>
                )}

                 {/* Botón de publicar el post */}
                <StyledButton variant="contained" onClick={() => savePost()}>Publicar</StyledButton>

                </FormControl>
            </FormCard>
        </Container>
    )
}


// Export del componente para uso externo
export default CreatePost;