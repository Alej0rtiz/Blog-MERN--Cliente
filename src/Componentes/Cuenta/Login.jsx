//imports de React
import { useState } from 'react';


//imports UI Material
import { Box, TextField, Button, styled } from '@mui/material';

//imports de assets
import LoginImage from '../../assets/Logo-nobg.png';


//Elementos estilizados
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

const SingUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

// Valores iniciales para el formulario de registro (signup):
const signupInitialValues = {
    name: '',   //nombre real
    username: '',   //nombre de usuario
    password: '',   //contraseña
}


const Login = () => {

    // Estado para alternar entre las vistas "login" y "signup"
    const [account, toggleAccount] = useState('login');

    // Estado para almacenar los datos del formulario de registro
    const [signup, setSignup] = useState(signupInitialValues);

    
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


    //retorno del componente
    return(
        <Componente>
            <Box>
                <Imagen src={LoginImage} alt="Logo de Connect"/>

                {
                     /* Renderizado condicional según si estamos en login o registro */
                    account === 'login' ?
                    
                    //vista de inicio de sesion
                    <Wrapper>
                    <TextField variant='standard' label='Nombre de usuario' />
                    <TextField variant='standard' label='Contraseña' />
                    <LoginButton variant='contained'>Iniciar Sesión</LoginButton>
                    {/* Botón para cambiar a la vista de registro */}
                    <SingUpButton onClick={() => toggleSingUp()} variant='outlined'>Crear una Cuenta</SingUpButton>
                </Wrapper>
                
                :

                //vista de registro
                <Wrapper>
                    <TextField variant='standard' name='UserName' label='Nombre de usuario' onChange={(e)=> onInputChange(e)} />
                    <TextField variant='standard' name='Name' label='Nombre' onChange={(e)=> onInputChange(e)} />
                    <TextField variant='standard' name='Password' label='Contraseña' onChange={(e)=> onInputChange(e)} />
                    <SingUpButton variant='contained'>Registrarse</SingUpButton>
                    {/* Botón para volver a la vista de login */}
                    <LoginButton onClick={() => toggleSingUp()} variant='outlined'>Ya tengo una cuenta</LoginButton>
                </Wrapper>

                }
            </Box>
        </Componente>
    )
}

export default Login;