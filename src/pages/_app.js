import '../styles/globals.css'
import Layout from '../components/Layout'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { HomeOutlined, ArticleOutlined, NotificationsNoneOutlined } from '@mui/icons-material';

const menuItens = [
  {text: 'Home'                 , icon: <HomeOutlined />     , path: '/' },
  {text: 'Consulta Processo'    , icon: <ArticleOutlined />, path: '/consultaProcesso' },
  {text: 'Consulta Áreas ativas', icon: <ArticleOutlined /> , path: '/cadastroArea' },
  {text: '-'},
  {text: 'Notificações', icon: <NotificationsNoneOutlined />, path: '/notificacoes' },
  {text: 'Mensagens'   , icon: <MailIcon /> , path: '/mensagens' },
]

function MyApp({ Component, pageProps }) {

  return (
    <Layout menuItens={menuItens} >
      <Component {...pageProps} />
    </Layout>
  ) 
    
}

export default MyApp
