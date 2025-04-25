//imports de React
import { useState, useContext } from 'react';


//imports UI Material
import { Box, TextField, Button, styled, Typography } from '@mui/material';

//imports de assets
import LoginImage from '../../assets/Logo-nobg.png';

//imports de servicios y contexto
import { API } from '../../Servicio/api.js';    // Módulo que contiene funciones para interactuar con el backend
import { DataContext } from '../../contexto/DataProvider.js';   // Contexto global para almacenar datos del usuario
import { useNavigate } from 'react-router-dom';     // Hook para redirigir programáticamente


//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
const Componente = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    
`;

const Imagen = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;

    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600; 
`;


//---------------------------------------------
// Valores iniciales para el formulario de registro (signup)
//---------------------------------------------
const signupInitialValues = {
    name: '',   //nombre real
    username: '',   //nombre de usuario
    password: '',   //contraseña
}

//---------------------------------------------
// Valores iniciales para el formulario de inicio de sesion (login)
//---------------------------------------------

const loginInitialValues = {
    username: '',   //nombre de usuario
    password: ''    //contraseña
}

//---------------------------------------------
// Componente principal
//---------------------------------------------

const Login = () => {

    // Estado para alternar entre las vistas "login" y "signup"
    const [account, toggleAccount] = useState('login');

    // Estado para almacenar los datos del formulario de registro
    const [signup, setSignup] = useState(signupInitialValues);

    // Estado para mostrar errores en pantalla
    const [error, setError] = useState('');

    // Estado para almacenar los datos del formulario de inicio de sesion
    const [login, setLogin] = useState(loginInitialValues);

    const { setAccount } = useContext(DataContext); // actualiza el contexto global de la app

    const Navigate = useNavigate(); // para redireccionamiento del usuario

     // Función que alterna entre la vista de login y registro
    const toggleSingUp = () => {
        // Si ya está en la vista de registro, se vuelve al login; si no, cambia a signup
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    // Función que se ejecuta cada vez que el usuario escribe en un input
    // Actualiza el estado "signup" usando el "name" del campo como clave
    const onInputChange = (e) =>{
        setSignup({...signup, [e.target.name]: e.target.value});   
    }

    // Función que se ejecuta al hacer clic en el botón de registro
    // Envía los datos del formulario de registro al backend
    const SignUpUser = async () => {

        let response = await API.userSignup(signup);
        if(response.IsSuccess){

            // Limpia error, reinicia formulario y cambia a vista de login
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        }
        else{

            setError('Algo salió mal, intentelo nuevamente mas tarde');

        }
    };

    const onValueChange = (e) =>{
        setLogin({...login, [e.target.name]: e.target.value});
    }

    // Función que se ejecuta al hacer clic en el botón de inicio de sesion
    // Envía los datos del formulario de inicio al backend
    const loginUser = async () =>{
        let response = await API.userLogin(login);

        if(response.IsSuccess){

            // Limpia error, reinicia formulario y cambia a vista de login
            setError('');
            setLogin(loginInitialValues);

            console.log("Datos del login:", response.data); //Console.log para depuracion
            // Guarda tokens en sessionStorage y redirige al home
            sessionStorage.setItem('TokenAccess', `Bearer ${response.data.TokenAccess}`);
            sessionStorage.setItem('RefreshToken', `Bearer ${response.data.RefreshToken}`);

            // Actualiza el contexto global con los datos del usuario autenticado
            setAccount({ username: response.data.username, name: response.data.name })

            Navigate('/Home'); // redirige a la página principal
        }
        else{

            setError('Algo salió mal, intentelo nuevamente mas tarde');
        }
    }

    //render del componente
    return(
        <Componente>
            <Box>
                <Imagen src={LoginImage} alt="Logo de Connect"/>

                {
                     /* Renderizado condicional según si estamos en login o registro */
                    account === 'login' ?
                    
                    //vista de inicio de sesion
                    <Wrapper>
                    <TextField variant='standard' value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Nombre de usuario' />
                    <TextField variant='standard' value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Contraseña' />
                    {/* Mensaje de error */}
                    {error && <Error>{error}</Error>}
                    
                    <LoginButton variant='contained' onClick={() => loginUser()}>Iniciar Sesión</LoginButton>
                    {/* Botón para cambiar a la vista de registro */}
                    <SignUpButton onClick={() => toggleSingUp()} variant='outlined'>Crear una Cuenta</SignUpButton>
                </Wrapper>
                
                :

                //vista de registro
                <Wrapper>
                    <TextField variant='standard' name='name' label='Nombre' onChange={(e)=> onInputChange(e)} />
                    <TextField variant='standard' name='username' label='Nombre de usuario' onChange={(e)=> onInputChange(e)} />
                    <TextField variant='standard' name='password' label='Contraseña' onChange={(e)=> onInputChange(e)} />
                    
                    {/* Mensaje de error */}
                    {error && <Error>{error}</Error>}
                    
                    <SignUpButton variant='contained' onClick={() => SignUpUser()}>Registrarse</SignUpButton>
                    {/* Botón para volver a la vista de login */}
                    <LoginButton onClick={() => toggleSingUp()} variant='outlined'>Ya tengo una cuenta</LoginButton>
                </Wrapper>

                }
            </Box>
        </Componente>
    )
}

export default Login;