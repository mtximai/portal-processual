// 08/02/22
// https://mui.com/pt/components/material-icons/

import { getService } from '../lib/libBase1'

import {useState, useEffect} from 'react'
import { Button, Divider, TextField, Grid, Typography} from '@mui/material';
import { Search, SettingsSystemDaydreamOutlined} from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputMask from 'react-input-mask';
import styles from './../styles/consultaProcesso.module.css'
import BtnProgress     from '../components/BtnProgress'

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


//Data no formato 'yyyy-mm-dd hh:mm:ss'
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

//const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL

// Componente
export default function ConsultaProcesso() {

  const [codigo, setCodigo] = useState('013225/2018')

  const [dados, setDados] = useState(iniDados)
  const [loading, setLoading] = useState(false)
  const [achou, setAchou] = useState(false)
  const [msg, setMsg] = useState('')
 
  
  function clickPesquisar(cod : string) {

    setLoading(true)
    setAchou(false)
    setMsg('')

    const mUrl = `http://localhost:2446/api/portaljurisdicionado/protocolo?cod=${cod}`

    const d = getService(mUrl)
              .then((r: ProtocoloType) => {
                
                if (r != null) {
                  setDados(r)
                  setAchou(true)
                }
                
                setLoading(false)
                setMsg(`Pesquisa concluída!`)
              })
              .catch( (e) => {

                setDados(iniDados)
                setAchou(false)
                
                setLoading(false)
                setMsg('Erro: falha na obtenção dos dados!')
              })
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
        <BtnProgress loading={ loading } onClick={ () => { clickPesquisar(codigo) } } />
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" size="small"
          startIcon={ <HighlightOffIcon fontSize="large" /> }
          onClick={() => { limpar() }}
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