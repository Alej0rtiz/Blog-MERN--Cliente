//imports de React
import { useState } from 'react';


//imports UI Material
import { Box, TextField, Button, styled } from '@mui/material';

//imports de assets
import LoginImage from '../../assets/Image-logo.png';


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


const Login = () => {

    //validacion para inicio de sesion o registro de usuario

    const [account, toggleAccount] = useState('login');

    const toggleSingUp = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }



    //retorno de Login
    return(
        <Componente>
            <Box>
                <Imagen src={LoginImage} alt="Logo de Connect"/>

                {
                    account === 'login' ?
                    
                    <Wrapper>
                    <TextField variant='standard' label='Nombre de usuario' />
                    <TextField variant='standard' label='Contraseña' />
                    <LoginButton variant='contained'>Iniciar Sesión</LoginButton>
                    <SingUpButton onClick={() => toggleSingUp()} variant='outlined'>Crear una Cuenta</SingUpButton>
                </Wrapper>
                
                :

                <Wrapper>
                    <TextField variant='standard' label='Nombre' />
                    <TextField variant='standard' label='Nombre de usuario' />
                    <TextField variant='standard' label='Contraseña' />
                    <SingUpButton variant='contained'>Registrarse</SingUpButton>
                    <LoginButton onClick={() => toggleSingUp()} variant='outlined'>Ya tengo una cuenta</LoginButton>
                </Wrapper>

                }
            </Box>
        </Componente>
    )
}

export default Login;