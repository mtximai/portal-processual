// 11/04/22
//
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BtnSpinner      from '../components/BtnSpinner'
import {
  Card, CardHeader, CardContent,
  Divider,
  Box, Grid, Typography
} from '@mui/material';

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface AreaProps {
  data: object[]
}

// Colunas da GRID
const columns = [
  { field: 'id', headerName: 'id', width: 90 },
  { field: 'COD_TCE', headerName: 'Protocolo', width: 120, editable: false},
  { field: 'PROCESSO', headerName: 'Processo', width: 120, editable: false},
  { field: 'SITUACAO', headerName: 'Situação', width: 180, editable: false},
  { field: 'AREA', headerName: 'Área', width: 250, editable: false},
];


// Componente
export default function Mesa(props) {
  
  const data = props.data
  const [dados, setDados] = useState([])

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('');
  
  const router = useRouter();

  useEffect(() => {

    let d = data.map((e,i) => {
      return {id: i, ...e}
    })

    setDados(d)

    console.log(d)

  }, [data])

  
  function clickPesquisar() {
    setLoading(true)
    setMsg('')

    router.push('/mesa')

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader title="Mesa de trabalho" />

      <CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <BtnSpinner loading={ loading } onClick={ clickPesquisar } text='Atualizar' />

          <Typography sx={{ fontWeight: 'bold', marginLeft:'10px', color: `${ msg.startsWith('Erro:') ? 'red':'blue' }` }}>{msg}</Typography>

        </Box>

        <Divider sx={{marginTop:'10px'}} />

        <div style={{ height:450, width:'100%' }}>
          <DataGrid
            rows={dados}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            checkboxSelection
            disableSelectionOnClick={true}
            density="compact"
            rowHeight={30}
            loading={dados.length == 0}
            className={"cell--textCenter"}
            hideFooter={false}
            hideFooterPagination={false}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
                backgroundColor: '#ccc'
              },
            }}
  
          />
        </div>

      </CardContent>
    </Card>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  //console.log('api................')

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({IdUsuarioExterno: 28, CodUg: 301692})
  }
 
  const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL
  const mUrl  = `${mEtcm}/api/portaljurisdicionado/processual/mesa`


  // Busca dados
  const response = await fetch(mUrl, options)
  const data = await response.json()

  //console.log('server:', context.req, data)
  //console.log('server: executando...', context.query.a)

  return {
    props: {data}, // will be passed to the page component as props
  }
}
