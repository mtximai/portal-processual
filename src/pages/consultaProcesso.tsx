// 08/02/22
// https://mui.com/pt/components/material-icons/

import React from 'react'
import {useState, useEffect} from 'react'
import { Button, Divider, TextField, Grid, Typography} from '@mui/material';
import { Search, SettingsSystemDaydreamOutlined} from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputMask from 'react-input-mask';
import styles from './../styles/consultaProcesso.module.css'
import BtnSpinner from '../components/BtnSpinner'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Router from 'next/router'


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


function f_dadosProtocolo(dados : ProtocoloType) {
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

  //const d = props.data as ProtocoloType
  
  //console.log('inicio...',d)
  
  const router = useRouter();
  
  const [codigo, setCodigo] = useState('013225/2018')
  
  const [dados, setDados] = useState(iniDados)

  const [loading, setLoading] = useState(false)
  const [achou, setAchou] = useState(false)
  const [msg, setMsg] = useState('')

  const [pesquisou, setPesquisou] = useState(false)
  

  // Progress para getServerSideProps()
  React.useEffect(() => {

    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
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
    
    if (pesquisou) {
      if (d == null) {
        setMsg('Não cadastrado!')
      } else {
        setDados(d)
        setMsg('Pesquisa concluída!')
      }
  
      setAchou(d != null)
    }

  }, [d, pesquisou])
  

  function clickPesquisar(cod : string) {
    setPesquisou(true)

    setLoading(true)
    setAchou(false)
    setMsg('')

    router.push(`/consultaProcesso?cod=${cod}`)
  }

  
  function limpar() {
    setCodigo('')
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
          onClick={() => { limpar() }}
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

      { achou ? f_dadosProtocolo(dados) : null }
              
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

  console.log(data, Date())

  return {
    props: {data} // will be passed to the page component as props
  }
}
