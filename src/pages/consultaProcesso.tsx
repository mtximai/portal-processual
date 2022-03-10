// 08/02/22
// https://mui.com/pt/components/material-icons/
import {useState, useEffect} from 'react'
import { Button, Divider, TextField, Grid} from '@mui/material';
import { Search} from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputMask from 'react-input-mask';
import styles from './../styles/consultaProcesso.module.css'

interface iProtocolo {
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

const initDados : iProtocolo = {
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

function f_dt(dt: string) {
  // Data no formato 'yyyy-mm-dd hh:mm:ss'

  //let r = new Date(dt.substring(0,10))
  
  //return r.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  return dt
}


function f_dadosProtocolo(dados : iProtocolo) {
  return (
    <>
    <Grid item xs={12} margin={0}>
      <span className={styles.texto}>Dados do Protocolo:
        <strong className={styles.single}>{dados.codProtocoloTCM}    </strong>
        -   Dt.Entrada: <strong className={styles.single}>{ f_dt(dados.dtEntrada) }</strong> 
      </span>
    </Grid>

    <Grid container spacing={2} margin={0}>
      <Grid item md={1}>
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

      <Grid item md={1} />

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


function fGet(url : string, fData : (p: iProtocolo) => void, fLoading: (p : boolean) => void, fError : (p : string) => void ) {

  fError('')
  fLoading(false)

  fetch(url, { method: "GET" })
  .then(response => {
    
    //console.log(response)

    // if (!response.ok) {
    //   throw Error('Dado não disponível!')
    // }

    if (response.status != 200) {
      throw Error('Aviso: Dado não disponível!')
    }

    return response.json()
  })
  .then (data => {

    //console.log('completado', data)

    fData(data)
    fLoading(false)
    fError('')

  }).catch(err => {

    let msg = err.message

    if (!err.message.startsWith('Aviso:')) {
      msg = `Erro de comunicação: ${err.message}`
    }
    
    fError(msg)
    fLoading(false)

    //console.log(msg)
  })
}


//const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL

// Componente
export default function ConsultaProcesso() {

  const [codigo, setCodigo] = useState('013225/2018')

  const [dados, setDados] = useState(initDados)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('inicio...')

  const [msg, setMsg] = useState('')
 
  
  function obterDados(cod : string) {
    fGet(`http://localhost:2446/api/portaljurisdicionado/protocolo?cod=${cod}`, setDados, setIsLoading, setError)
  }
  
  function limpar() {
    setCodigo('')
  }

  function f_exibirDados() {
    return !error ? f_dadosProtocolo(dados) : null

  }

  useEffect(() => {
    if (error)
      setMsg(error)
    else
      setMsg('')

  }, [error])


  return (
    <Grid container spacing={1} >

      <Grid item xs={12}>
        <h2 style={ {color: 'blue'} }>Consulta de processos</h2>
      </Grid>

      <Grid item >
        <InputMask mask="999999/9999" className={styles.texto}
          name='mskCodigo'
          inputRef={input => input && input.focus() }
          alwaysShowMask={true}
          value={codigo}
          onChange={ e => setCodigo(e.target.value) }
        />
      </Grid>

      <Grid item>
        <Button color="primary" variant="contained" size="small"
          startIcon={ <Search fontSize="large" /> }
          onClick={() => { obterDados(codigo) }}
        >
          { isLoading ? "Aguarde...":"Pesquisar"}
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" size="small"
          startIcon={ <HighlightOffIcon fontSize="large" /> }
          onClick={() => { limpar() }}
        >
          Limpar
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item>
        <h2>{msg}</h2>
      </Grid>

      { f_exibirDados() }
        
    </Grid>
  )
}