//imports de React
import { useState, useContext } from 'react';

//imports Material UI
import { Box, TextField, Button, styled, Typography } from '@mui/material';

//imports de assets
import LoginImage from '../../assets/Logo-nobg.png';

//imports de servicios y contexto
import { API } from '../../Servicio/api.js';
import { DataContext } from '../../contexto/DataProvider.js';
import { useNavigate } from 'react-router-dom';

// Estilo principal con diseño horizontal
const Fondo = styled(Box)`
    height: 100vh;
    width: 100vw;
    display: flex;
    background: linear-gradient(135deg, #1e3a8a, #0d47a1); /* Gradiente azul oscuro elegante */
`;

const ContenedorImagen = styled(Box)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Imagen = styled('img')`
    width: 80%;
    max-width: 500px;
    height: auto;
`;

const ContenedorFormulario = styled(Box)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente */
    backdrop-filter: blur(12px);
    padding: 40px;
`;

const Componente = styled(Box)`
    width: 100%;
    max-width: 450px;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid #1e3a8a; /* Borde azul elegante */
`;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #0d47a1; /* Azul más oscuro */
    color: #fff;
    height: 48px;
    border-radius: 8px;
    &:hover {
        background: #1565c0; /* Azul intermedio */
        transform: scale(1.03);
    }
`;

const SingUpButton = styled(Button)`
    text-transform: none;
    background: #1e88e5; /* Azul vibrante */
    color: white;
    height: 48px;
    border-radius: 8px;
    &:hover {
        background: #039be5; /* Azul brillante */
        transform: scale(1.03);
    }
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff3b3b;
    font-weight: bold;
`;

// Valores iniciales
const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const loginInitialValues = {
    username: '',
    password: ''
};

const Login = ({ isUserAuthenticated }) => {
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const Navigate = useNavigate();

    const toggleSingUp = () => {
        toggleAccount(account === 'signup' ? 'login' : 'signup');
        setError('');
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const SignUpUser = async () => {
        let response = await API.userSignup(signup);
        if (response.IsSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            setError('Algo salió mal. Inténtalo nuevamente más tarde.');
        }
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.IsSuccess) {
            setError('');
            setLogin(loginInitialValues);
            sessionStorage.setItem('TokenAccess', `Bearer ${response.data.TokenAccess}`);
            sessionStorage.setItem('RefreshToken', `Bearer ${response.data.RefreshToken}`);
            setAccount({ username: response.data.username, name: response.data.name });
            isUserAuthenticated(true);
            Navigate('/Home');
        } else {
            setError('Algo salió mal. Inténtalo nuevamente más tarde.');
        }
    };

    return (
        <Fondo>
            {/* Imagen a la izquierda */}
            <ContenedorImagen>
                <Imagen src={LoginImage} alt="Imagen de Login" />
            </ContenedorImagen>

            {/* Formulario a la derecha */}
            <ContenedorFormulario>
                <Componente>
                    {account === 'login' ? (
                        <Wrapper>
                            <Typography variant="h5" align="center" fontWeight="bold" color="#0d47a1">
                                Iniciar Sesión
                            </Typography>
                            <TextField variant='standard' value={login.username} onChange={onValueChange} name='username' label='Nombre de usuario' />
                            <TextField variant='standard' value={login.password} onChange={onValueChange} name='password' label='Contraseña' type="password" />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={loginUser}>Iniciar Sesión</LoginButton>
                            <SingUpButton variant='outlined' onClick={toggleSingUp}>Crear una Cuenta</SingUpButton>
                        </Wrapper>
                    ) : (
                        <Wrapper>
                            <Typography variant="h5" align="center" fontWeight="bold" color="#0d47a1">
                                Registro
                            </Typography>
                            <TextField variant='standard' name='username' label='Nombre de usuario' onChange={onInputChange} />
                            <TextField variant='standard' name='name' label='Nombre' onChange={onInputChange} />
                            <TextField variant='standard' name='password' label='Contraseña' onChange={onInputChange} type="password" />
                            {error && <Error>{error}</Error>}
                            <SingUpButton variant='contained' onClick={SignUpUser}>Registrarse</SingUpButton>
                            <LoginButton variant='outlined' onClick={toggleSingUp}>Ya tengo una cuenta</LoginButton>
                        </Wrapper>
                    )}
                </Componente>
            </ContenedorFormulario>
        </Fondo>
    );
};

export default Login;
