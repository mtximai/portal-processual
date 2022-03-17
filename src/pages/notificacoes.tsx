import { NotificationsNoneOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import BtnSpinner from "../components/BtnSpinner";
import { useLayoutUpdate, iContext } from '../components/Layout';

export default function Tela1() {

  const ctxLayout = useLayoutUpdate() as iContext

  function f_onClick() {
    ctxLayout.f_qtNotificacaoUpdate(ctxLayout.qtNotificacao + 1)
  }
  
  return (
    <Box
      display='flex'
      flexDirection='column'
      
    >

      <h2>Notificações</h2>

      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
        sapien faucibus et molestie ac.
      </Typography>

      <BtnSpinner
        text='Notificações'
        icon={<NotificationsNoneOutlined />}
        onClick={f_onClick}
      />

    </Box>
  )
}