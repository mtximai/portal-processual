// Mauro - 08/02/22

import * as React from 'react';
import {useState, useEffect} from 'react'
import { Divider, TextField, Grid, Typography} from '@mui/material';
import { Search, SettingsSystemDaydreamOutlined} from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputMask from 'react-input-mask';
import styles from './../styles/consultaProcesso.module.css'
import BtnSpinner from '../components/BtnSpinner'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


type ProtocoloType = {
  codProtocoloTCM: string;
  codProcesso: string;
  dtEntrada: string;
  conselheiro: string;
  areaAtual: string;
  assunto: string;
  tipoProtocolo: string;
  siglaUnidadeGestora: string;
  nomeUnidadeGestora: string;
}

const iniDados : ProtocoloType = {
  codProtocoloTCM: "           ",
  codProcesso: "",
  dtEntrada: "",
  conselheiro: "",
  areaAtual: "",
  assunto: "",
  tipoProtocolo: "",
  siglaUnidadeGestora: "",
  nomeUnidadeGestora: ""
}


// dt no formato 'yyyy-mm-dd hh:mm:ss'
function f_dt(dt: string) {

  let resp = ''

  if (dt != null) {
    let r = new Date(dt.substring(0,10))
    resp = r.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  }

  return resp
}


function f_protocolo(dados : ProtocoloType) {

  return (
    <>
    <Grid item xs={12} margin={0}>
      <span className={styles.texto}>Dados do Protocolo:
        <strong className={styles.single}>{dados.codProtocoloTCM}    </strong>
        -   Dt.Entrada: <strong className={styles.single}>{ f_dt(dados.dtEntrada) }</strong> 
      </span>
    </Grid>

    <Grid container spacing={2} margin={0}>
      <Grid item md={2}>
        <TextField
          id="idProcesso"
          label="Processo"
          InputProps={{ readOnly: true }} size="small" fullWidth
          value={dados.codProcesso}
        />
      </Grid>

      <Grid item md={3}>
        <TextField
          id="idTipo"
          label="Tipo"
          InputProps={{ readOnly: true }} size="small"
          value={dados.tipoProtocolo}
          fullWidth
        />
      </Grid>

      <Grid item md={3}>
        <TextField
          id="idAssunto"
          label="Assunto"
          InputProps={{ readOnly: true }} size="small"
          value={dados.assunto}
          maxRows={4}
          multiline
          fullWidth
        />
      </Grid>

      <Grid item md={3}>
        <TextField
          id="idProcesso"
          label="Unidade Gestora"
          InputProps={{ readOnly: true }} size="small" fullWidth
          value={dados.nomeUnidadeGestora}
        />
      </Grid>

    </Grid>

    <Grid container spacing={2} margin={0}>

      <Grid item md={2} />

      <Grid item md={3}>
        <TextField
          id="idConselheiro"
          label="Conselheiro"
          InputProps={{ readOnly: true }} size="small" fullWidth
          value={dados.conselheiro}
        />
      </Grid>

      <Grid item md={3}>
        <TextField
          id="idAreaAtual"
          label="Área atual"
          InputProps={{ readOnly: true }} size="small" fullWidth
          value={dados.areaAtual}
        />
      </Grid>

    </Grid>
    </>
  )
}


interface iProps {
  data: ProtocoloType
}

// Componente
export default function ConsultaProcesso<iProps>({ data : d}) {

  const router = useRouter();
  
  const [codigo, setCodigo] = useState('013225/2018')
  
  const [dados, setDados] = useState(iniDados)

  const [loading, setLoading] = useState(false)
  const [pesquisando, setPesquisando] = React.useState(false);

  const [achou, setAchou] = useState(false)
  const [msg, setMsg] = useState('')
 

  // Progress para getServerSideProps()
  React.useEffect(() => {

    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
      setPesquisando(false)
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  useEffect( () => {
    
    if (router.query?.cod) {
      if (d == null) {
        setMsg('Não cadastrado!')
      } else {
        setDados(d)
        setMsg('Pesquisa concluída!')
      }
  
      setAchou(d != null)
    }

  }, [d, router.query?.cod])
  

  function clickPesquisar(cod : string) {

    setLoading(true)
    setPesquisando(true)

    setAchou(false)
    setMsg('')

    router.push(`/consultaProcesso?cod=${cod}`)
  }


  // Progress
  function f_progress() {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pesquisando}
        onClick={ () => setPesquisando(true) }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  function f_limpar() {
    setCodigo('')
    setMsg('')
  }


  return (

    <Grid container spacing={1} >

      <Grid item xs={12}>
        <h2 style={ {color: 'blue'} }>Consulta de processos</h2>
      </Grid>

      <Grid item >
        <InputMask mask="999999/9999" className={styles.texto}
          name='mskCodigo'
          // inputRef={input => input && input.focus() }
          alwaysShowMask={true}
          value={codigo}
          onChange={ e => setCodigo(e.target.value) }
        />
      </Grid>

      <Grid item>
        <BtnSpinner loading={ loading } onClick={ () => { clickPesquisar(codigo) } } />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={ <HighlightOffIcon fontSize="large" /> }
          onClick={ f_limpar }
          style={{textTransform: 'none'}}
        >
          Limpar
        </Button>
      </Grid>

      <Grid item>
        <Typography sx={{ fontWeight: 'bold' }}>{msg}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ marginTop:'10px' }} />
      </Grid>

      { achou ? f_protocolo(dados) : null }
      { pesquisando ? f_progress() : null }

    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL
  
  let cod = context.query.cod

  let data: ProtocoloType = null

  if (cod) {
    const mUrl = `${mEtcm}/api/portaljurisdicionado/protocolo?cod=${cod}`
    
    // Busca dados
    const resp = await fetch(mUrl)

    if (resp.status == 200) {
      data = await resp.json()
    }
  }

  //console.log(data?.areaAtual, Date())

  return {
    props: {data} // will be passed to the page component as props
  }
}
