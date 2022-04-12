// 08/02/22
// https://mui.com/pt/components/material-icons/
//
// > yarn add @mui/x-data-grid
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
  { field: 'id', headerName: 'Código', width: 90 },
  { field: 'nome', headerName: 'Nome', width: 400, editable: false}
];


// Componente
export default function CadastroArea(props) {
  
  const data = props.data
  const [dados, setDados] = useState([])

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    setDados(data)
  }, [data])

  
  function clickPesquisar() {
    setLoading(true)
    setMsg('')

    router.push('/cadastroArea')

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader title="Cadastro de Áreas ativas" />

      <CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <BtnSpinner loading={ loading } onClick={ clickPesquisar } text='Atualizar' />

          <Typography sx={{ fontWeight: 'bold', marginLeft:'10px', color: `${ msg.startsWith('Erro:') ? 'red':'blue' }` }}>{msg}</Typography>

        </Box>

        <Divider sx={{marginTop: '10px'}} />

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={dados} columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            density='compact'
            checkboxSelection
            disableSelectionOnClick
          />
        </div>

      </CardContent>
    </Card>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  console.log('api................')

  const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL
  
  const mUrl  = `${mEtcm}/api/portaljurisdicionado/processual/AreaAtual`

  // Busca dados
  const response = await fetch(mUrl)
  const data = await response.json()

  //console.log('server:', context.req, data)
  //console.log('server: executando...', context.query.a)

  return {
    props: {data}, // will be passed to the page component as props
  }
}
