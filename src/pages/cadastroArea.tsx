// 08/02/22
// https://mui.com/pt/components/material-icons/
//
// > yarn add @mui/x-data-grid
//
import { getService } from '../lib/libBase1'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BtnProgress      from '../components/BtnProgress'
import {
  Button,
  Card, CardHeader, CardContent,
  Divider,
  TextField,
  Box, Grid, Typography
} from '@mui/material';

const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL


// Componente
export default function CadastroArea() {

  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('');

  
  // Colunas da GRID
  const columns = [
    { field: 'id', headerName: 'Código', width: 90 },
    { field: 'nome', headerName: 'Nome', width: 400, editable: false}
  ];
  

  function clickPesquisar() {

    setLoading(true)
    setMsg('')

    const d = getService(`${mEtcm}/api/portaljurisdicionado/AreaAtual`)
              .then( (r: object[]) => {

                let dados = (r == null ? [] : r)

                setDados(dados)
                setLoading(false)
                setMsg(`Processamento concluído: ${dados.length} registro(s) encotrados!`)
              })
              .catch( (e) => {
                setDados([])
                setLoading(false)
                setMsg('Erro: falha na obtenção dos dados!')
                console.log(e)
              })
  }

  return (
    <Card>
      <CardHeader title="Cadastro de Áreas ativas" />

      <CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <BtnProgress loading={ loading } onClick={ clickPesquisar } />

          <Typography sx={{ fontWeight: 'bold', marginLeft:'10px', color: `${ msg.startsWith('Erro:') ? 'red':'blue' }` }}>{msg}</Typography>

        </Box>

        <Divider sx={{marginTop: '10px'}} />

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={dados} columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>

      </CardContent>
    </Card>
  );

}