import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { API } from '../../Servicio/api';


const ProfileContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.15)",       
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
    padding: theme.spacing(4),
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    color: "#e0e7ff",
    maxWidth: 360,
    margin: "auto",
    marginTop: theme.spacing(12),
    textAlign: "center",
    userSelect: "none",
}));

const StyledIcon = styled(AccountCircleIcon)({
    fontSize: 100,
    color: "#90cdf4",
    marginBottom: 16,
});


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.getUserProfile();
                if (response?.IsSuccess) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ProfileContainer role="main" aria-label="Perfil de usuario">
        <StyledIcon />
        <Typography variant="h5" fontWeight="600" gutterBottom>
            {user?.username || 'Nombre de usuario'}
        </Typography>
        <Typography variant="subtitle1" >
            {user?.name || 'Nombre completo'}
        </Typography>
    </ProfileContainer>
    );
};

export default Profile;