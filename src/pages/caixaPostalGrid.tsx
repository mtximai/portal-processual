// 12/04/22

import Typography from "@mui/material/Typography";
import BtnSpinner from "../components/BtnSpinner";
import { iContext, useLayoutUpdate } from "../components/Layout";
import MailIcon from '@mui/icons-material/Mail';
import { GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router'

import {
  Card, CardHeader, CardContent,
  Divider,
  Box, Grid,
} from '@mui/material';


// Colunas da GRID
const columns = [
  { field: 'id', headerName: 'Código', width: 90, hide: true },
  { field: 'COD_TCE', headerName: 'Protocolo', width: 120, editable: false},
  { field: 'COD_PROCESSO', headerName: 'Processo', width: 140, editable: false},
  { field: 'NM_AREA', headerName: 'Área', width: 250, editable: false, renderCell: (p) => (<div title={p.value}>{p.value}</div>) },
  { field: 'NM_STATUS', headerName: 'Status', width: 120, editable: false},
  { field: 'NM_STATUS_LEITURA', headerName: 'Status leitura', width: 120, editable: false},
  { field: 'DATA_VISUALIZACAO', headerName: 'Data ciência', width: 120, editable: false},
  { field: 'DATA_RESPOSTA', headerName: 'Data resposta', width: 120, editable: false},
  { field: 'DATA_NOTIFICACAO', headerName: 'Data notificação', width: 120, editable: false, renderCell: (p) => {
    console.log(p, typeof p)
  return <div title={p.value}>{p.value}</div>} },
];

export default function CaixaPostal(props) {

  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let r = props.data.map((e,i) => {
      return {id: i, ...e}
    })

    setDados(r)
  }, [])

  function clickPesquisar() {
    setLoading(true)
    setMsg('')

    router.push('/caixaPostal')

    setLoading(false)
  }

  const router = useRouter();


  // const ctxLayout = useLayoutUpdate() as iContext
  // function f_onClick() {
  //   ctxLayout.callbackCorreio( (q,f) => f(q+1) )
  // }
  
  return (
    
    <Card>
      <CardHeader title="Caixa Postal" />

      <CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <BtnSpinner loading={ loading } onClick={ clickPesquisar } text='Atualizar' />

          <Typography sx={{ fontWeight: 'bold', marginLeft:'10px', color: `${ msg.startsWith('Erro:') ? 'red':'blue' }` }}>{msg}</Typography>

        </Box>

        <Divider sx={{marginTop: '10px'}} />

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid rows={dados} columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            density='compact'
            checkboxSelection
            disableSelectionOnClick
          />
        </div>

      </CardContent>
    </Card>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({IdUsuarioExterno: 28, CodUg: 301692})
  }

  const idUsuario = 28
  const codUg = 301692
  const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL
  
  const mUrl  = `${mEtcm}/api/portaljurisdicionado/processual/caixaPostal`

  // Busca dados
  const response = await fetch(mUrl, options)
  const data = await response.json()

  return {
    props: {data},
  }
}
