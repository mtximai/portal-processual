import '../styles/globals.css'
import Layout from '../components/Layout'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { HomeOutlined, ArticleOutlined, NotificationsNoneOutlined } from '@mui/icons-material';

// { text: 'Mesa de trabalho', icon: <MailIcon />, path: '/mesa' },
const menuItens = [
  { text: 'Home', icon: <HomeOutlined />, path: '/' },
  { text: 'Consultar protocolo', icon: <MailIcon />, path: '/protocoloConsultar' },
  { text: 'Enviar protocolo', icon: <MailIcon />, path: '/protocoloEnviar' },
  { text: 'Caixa Postal', icon: <MailIcon />, path: '/caixaPostal' },
  { text: '-' },
  { text: 'Consulta Processo', icon: <ArticleOutlined />, path: '/consultaProcesso' },
  { text: 'Visualizador de Atos', icon: <ArticleOutlined />, path: '/visualizador' },
  { text: 'Consulta Áreas ativas', icon: <ArticleOutlined />, path: '/cadastroArea' },
]

function MyApp({ Component, pageProps }) {

  return (
    <Layout menuItens={menuItens} tituloDrawer='Portal Processual' >
      <Component {...pageProps} />
    </Layout>
  )

}

export default MyApp
