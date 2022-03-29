// https://mui.com/material-ui/react-list/
// 20/03/22 - Mauro

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router'
import ConfirmationDialog from '../../components/DialogConfirmation';


function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


// Component
export default function Index() {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  // Utilizado pelo Dialog:
  const [exibirContato, setExibirContato] = React.useState(false);

  const handleCloseDialog = (confirm: boolean) => {
    setExibirContato(false);
  };

  const router = useRouter();

  return (
    <Container>

      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Portal Processual
      </Typography>

      <Box sx={{ flexGrow: 1, maxWidth: 752, border:'1px solid #eaf5e9', padding:'10px', borderRadius:'10px' }}>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Tutoriais
            </Typography>

            <Demo>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary="View PDF #1"
                    sx={{cursor:'pointer'}}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="View PDF #2"
                    sx={{cursor:'pointer'}}
                  />
                </ListItem>

              </List>
            </Demo>
          </Grid>

          {/* Ajuda */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Precisa de ajuda?
            </Typography>

            <Demo>
              <List dense={dense}>
                <ListItem>
                  <ListItemIcon><FolderIcon /></ListItemIcon>
                  <ListItemText primary="Contato" onClick={ () => setExibirContato(true) } sx={{cursor:'pointer'}} />
                </ListItem>

                <ListItem>
                  <ListItemIcon><FolderIcon /></ListItemIcon>
                  <ListItemText primary="Dúvidas mais frequentes" />
                </ListItem>
              </List>
            </Demo>
          </Grid>

        </Grid>
      </Box>


      <ConfirmationDialog
        id="ringtone-menu"
        open={exibirContato}
        onClose={handleCloseDialog}
        title='Contato'
      >
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>

          <Typography variant='body1' component='div'>Envie suas dúvidas para o email minha.duvida@tcm.sp.gov.br </Typography>
          <Typography variant='body1' component='div'>Ou se preferir utilize o telefone (11) 9999-9999. </Typography>

        </Box>
      </ConfirmationDialog>

    </Container>

  );
}
