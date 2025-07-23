
import { Dialog, Box, Typography, List, ListItem, Button, styled, Divider } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { useState } from 'react';

import { qrCodeImage } from '../../Constants/data';

const Component = styled(Box)`
    display: flex;
`

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`

const QRCode = styled('img') ({
    width: 264,
    height: 264,
    margin: '50px 0 0 50px'
});

const GoogleButton = styled(Button)`
    background-color: #4285f4;
    color: white;
    padding: 12px 24px;
    margin: 20px 0;
    text-transform: none;
    font-size: 16px;
    border-radius: 8px;
    width: 100%;
    max-width: 300px;
    
    &:hover {
        background-color: #3367d6;
    }
    
    &:disabled {
        background-color: #cccccc;
        color: #666666;
    }
`;

const AuthContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`;

const OrDivider = styled(Box)`
    display: flex;
    align-items: center;
    margin: 20px 0;
    width: 100%;
    max-width: 300px;
    
    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #e0e0e0;
    }
    
    span {
        padding: 0 16px;
        color: #666;
        font-size: 14px;
    }
`;

const Title = styled(Typography)`
font-size: 26px;
margin-bottom:25px;
color: #525252;
font-weight: 300;
font-family: inherit;

`;

const StyledList = styled(List)`
    & > li {
        padding: 0,
        margin-top: 15px,
        font-size: 18px,
        line-height: 28x,
        color: #4a4a4a,
    }
`

const dialogstyle = {
    height: '96%',
    marginTop: '12%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden',

};

const LoginDialog = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            console.log('User signed in:', user);
            // You can add additional logic here like storing user data or redirecting
        } catch (error) {
            console.error('Error signing in with Google:', error);
            alert('Failed to sign in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return (
            <Dialog
                open={true} 
                PaperProps={{ sx: dialogstyle }}
            >
                <Component>
                    <Container>
                        <Title>Welcome, {user.displayName}!</Title>
                        <Typography variant="body1" color="textSecondary">
                            You are successfully signed in with Google.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <img 
                                src={user.photoURL} 
                                alt="Profile" 
                                style={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: '50%',
                                    border: '2px solid #00bfa5'
                                }} 
                            />
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {user.email}
                        </Typography>
                    </Container>
                </Component>
            </Dialog>
        );
    }

    return (
        <Dialog
            open={true} PaperProps={{ sx: dialogstyle }}
        >

            <Component>
                <Container>                  
                        <Title>To use WhatsApp on your computer:</Title>
                        <StyledList>
                            <ListItem>1. Open WhatsApp on your phone</ListItem>
                            <ListItem>2. Tap Menu Settings and select Whatsapp Web</ListItem>
                            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                        </StyledList>
                        
                        <AuthContainer>
                            <OrDivider>
                                <span>OR</span>
                            </OrDivider>
                            
                            <GoogleButton
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                startIcon={
                                    <img 
                                        src="https://developers.google.com/identity/images/g-logo.png" 
                                        alt="Google" 
                                        style={{ width: 20, height: 20 }}
                                    />
                                }
                            >
                                {loading ? 'Signing in...' : 'Sign in with Google'}
                            </GoogleButton>
                        </AuthContainer>
                </Container>
                <Box>
                    <QRCode src={qrCodeImage} alt="qr code"/>
                </Box>
            </Component>

        </Dialog>
    )
}

export default LoginDialog;