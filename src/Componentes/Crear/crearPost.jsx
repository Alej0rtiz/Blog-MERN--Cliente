//imports de react
import { useState, useEffect, useContext } from "react"; 

//imports Material UI
import { Box, Button, FormControl, InputBase, TextareaAutosize } from "@mui/material";
import { AddCircle as Add } from '@mui/icons-material';

//imports React Router
import { useNavigate, useLocation } from 'react-router-dom';

//import del contexto global para obtener al usuario autenticado
import { DataContext } from "../../contexto/DataProvider";

//import de API
import { API } from '../../Servicio/api'

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

//Pendientes


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


    const defaultImage = require('../../assets/default-post-img.png');// Imagen por defecto para el post

    const navigate = useNavigate(); // Navegación entre rutas

    //pendiente, muestra de subida de imagen, idealmente, usar un img en el retorno del componente, posiblemente poder mostrar una por defecto o en blanco, como aquella subida
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
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]);

     //funcion Maneja el cambio de los campos del formulario
    const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
}

    const savePost = async () => {

        let response = await API.createPost(post);//llamado al API para el guardado
            navigate('/'); // Redirige a la página principal después de crear el post

    }

        // =========================
        // RENDERIZADO DEL FORMULARIO
        // =========================


    return(
        <Box sx={{ paddingTop: '80px', paddingX: '20px' }}>
            {/*Para estilos de la seccion de crear un post*/}

            <img 
                src={url} 
                alt="preview" />

            <FormControl>

                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                {/* Botón de subir archivo (oculto), activado al hacer clic en el ícono */}
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])}/>

                {/* Campo para el título del post */}
                <InputBase placeholder="Titulo del post" onChange={(e) => handleChange(e)} name="title"/>

                {/* Área de texto para la descripción del post */}
                <TextareaAutosize minRows={5} placeholder="Comparte tu trabajo..." onChange={(e) => handleChange(e)} name="description"/>
                
                 {/* Botón de publicar el post */}
                <Button variant="contained" onClick={() => savePost()}>Publicar</Button>

            </FormControl>
        </Box>
    )
}


// Export del componente para uso externo
export default CreatePost;