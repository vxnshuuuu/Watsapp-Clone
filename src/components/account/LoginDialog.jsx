
import { Dialog, Box, Typography, List, ListItem, styled } from '@mui/material';

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
                </Container>
                <Box>
                    <QRCode src={qrCodeImage} alt="qr code"/>
                </Box>
            </Component>

        </Dialog>
    )
}

export default LoginDialog;