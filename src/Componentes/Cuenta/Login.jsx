//imports de React 
import { useState, useContext } from 'react';

//imports Material UI
import { Box, TextField, Button, styled, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//imports de servicios y contexto
import { API } from '../../Servicio/api.js';    // Módulo que contiene funciones para interactuar con el backend
import { DataContext } from '../../contexto/DataProvider.js';   // Contexto global para almacenar datos del usuario
import { useNavigate, useLocation } from 'react-router-dom';     // Hook para redirigir programáticamente

// Fondo principal con animación de gradiente
const Fondo = styled(Box)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgba(59,130,246,0.4), rgba(236,72,153,0.4), rgba(34,197,94,0.4));
    background-size: 400% 400%;
    animation: gradientAnimation 15s ease infinite;

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;


// Cuadro del formulario con efecto semi-transparente
const Componente = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 40px;
    border-radius: 12px;
    width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`;

const Wrapper = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(135deg, #3b82f6, #10b981);
    color: #fff;
    height: 44px;
    border-radius: 24px;
    transition: all 0.3s ease;
    font-weight: bold;

    &:hover {
        background: linear-gradient(135deg, #2563eb, #059669);
        transform: scale(1.05);
    }
`;

const SingUpButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(135deg, #ec4899, #3b82f6);
    color: white;
    height: 44px;
    border-radius: 24px;
    transition: all 0.3s ease;
    font-weight: bold;

    &:hover {
        background: linear-gradient(135deg, #db2777, #2563eb);
        transform: scale(1.05);
    }
`;

const EnlaceRegistro = styled('span')`
    color: #0d47a1;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #1565c0;
    }
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff3b3b;
    font-weight: bold;
`;

const CustomTextField = styled(TextField)({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        color: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '12px',
        height: '48px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        '& input': {
            padding: '12px 14px',
            height: '100%',
            boxSizing: 'border-box',
        },
        '& fieldset': {
            borderColor: 'transparent',
            borderRadius: '12px',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.6)',
        top: '50%',
        left: '14px',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease',
    },
    '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink': {
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },
});

const signupInitialValues = { name: '', username: '', password: '' };
const loginInitialValues = { username: '', password: '' };

const Login = ({ isUserAuthenticated }) => {
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { setAccount } = useContext(DataContext);


    const Navigate = useNavigate(); // para redireccionamiento del usuario

    const location = useLocation();//location para rescatar la url anterior al inicio de sesion

    // URL a la que se intentó acceder o '/' por defecto
    const from = location.state?.from?.pathname || '/';

     // Función que alterna entre la vista de login y registro
    const toggleSingUp = () => {
        toggleAccount(account === 'signup' ? 'login' : 'signup');
        setError('');
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const SignUpUser = async () => {

        // Validación: no permitir campos vacíos
        if (!signup.name.trim() || !signup.username.trim() || !signup.password.trim()) {
        setError('⛔ Por favor, complete todos los campos.');
        return;
        }

        try {
            
            let response = await API.userSignup(signup);
            if(response.IsSuccess){

            // Limpia error, reinicia formulario y cambia a vista de login
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
            }
            else{

            setError(response.message || 'No se pudo crear la cuenta. Intente más tarde.');
            
            }} catch (error) {

                if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError('Ocurrió un error al registrarse. Intente más tarde.');
        }
        console.error('Error en registro:', error);
        }
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    // Función que se ejecuta al hacer clic en el botón de inicio de sesion
    // Envía los datos del formulario de inicio al backend
    const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
};

const loginUser = async () => {
    if (!login.username.trim() || !login.password.trim()) {
        setError('⛔ Por favor, complete todos los campos.');
        return;
        }

        try {
            let response = await API.userLogin(login);
            
            if(response.IsSuccess){

            // Limpia error, reinicia formulario y cambia a vista de login
            setError('');
            setLogin(loginInitialValues);

            console.log("Datos del login:", response.data); //Console.log para depuracion

            // Guarda tokens en sessionStorage y redirige al home
            sessionStorage.setItem('TokenAccess', response.data.TokenAccess);
            sessionStorage.setItem('RefreshToken', response.data.RefreshToken);

            console.log('RefreshToken guardado en sessionStorage:', sessionStorage.getItem('RefreshToken'));

            // Actualiza el contexto global con los datos del usuario autenticado
            setAccount({ username: response.data.username, name: response.data.name })

            // Indica que el usuario está autenticado y redirige a la página de inicio
            isUserAuthenticated(true);

            Navigate(from, { replace: true });
        }
        else{

            setError(response.message || 'Credenciales incorrectas');
        }} catch (error) {

            if (error.response && error.response.data && error.response.data.message){

                setError(error.response.data.message); // "El usuario no existe"
            }else{
                setError('⛔ Credenciales incorrectas');
            }
            console.error('Error en la respuesta:', error); // depuración
        }

    }

    return (
        <Fondo>
            <Componente>
                {account === 'login' ? (
                    <Wrapper>
                        <Typography variant="h5" align="center" fontWeight="bold" color="#FFFFFF">
                            Iniciar Sesión
                        </Typography>
                        <CustomTextField variant="outlined" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Nombre de usuario" />
                        <CustomTextField
                            variant="outlined"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Iniciar Sesión</LoginButton>
                        <Typography align="center" fontSize={14}>
                            <Typography component="span" color="#FFFFFF" fontSize={14} fontWeight={300} sx={{ mr: 0.5 }}>
                                ¿No tienes cuenta?
                            </Typography>
                            <EnlaceRegistro onClick={toggleSingUp} style={{ color: '#90caf9' }}>
                                Regístrate aquí
                            </EnlaceRegistro>
                        </Typography>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <Typography variant="h5" align="center" fontWeight="bold" color="#FFFFFF">
                            Registro
                        </Typography>
                        <CustomTextField variant="outlined" name="username" label="Nombre de usuario" onChange={(e)=> onInputChange(e)} />
                        <CustomTextField variant="outlined" name="name" label="Nombre" onChange={(e)=> onInputChange(e)} />
                        <CustomTextField
                            variant="outlined"
                            name="password"
                            label="Contraseña"
                            onChange={(e)=> onInputChange(e)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && <Error>{error}</Error>}
                        <SingUpButton variant="contained" onClick={() => SignUpUser()}>Registrarse</SingUpButton>
                        <Typography align="center" fontSize={14}>
                            <Typography component="span" color="#FFFFFF" fontSize={14} fontWeight={300} sx={{ mr: 0.5 }}>
                                ¿Ya tienes una cuenta?
                            </Typography>
                            <EnlaceRegistro onClick={() => toggleSingUp()} style={{ color: '#90caf9' }}>
                                Inicia sesión aquí
                            </EnlaceRegistro>
                        </Typography>
                    </Wrapper>
                )}
            </Componente>
        </Fondo>
    );
}

export default Login;
