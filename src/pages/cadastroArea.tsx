// 08/02/22
// https://mui.com/pt/components/material-icons/
//
// > yarn add @mui/x-data-grid
//

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import {
  Button,
  Card, CardHeader, CardContent,
  Divider,
  TextField,
  Box, Grid, Typography
} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import BtnProgress     from '../components/BtnProgress'


function obterDados() {

  return new Promise( (resolve, reject) => {

    fetch("http://localhost:2446/api/portaljurisdicionado/AreaAtual")
      .then((data) => data.json())
      .then((data) => {
        resolve(data)
      })
      .catch(e => reject(e))

  })

}


const progress = <CircularProgress color="secondary" size={20} />


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

    const d = obterDados()
              .then((r: object[]) => {
                setDados(r)
                setLoading(false)
                setMsg(`Processamento concluído: ${r.length} registro(s) encotrados!`)
              })
              .catch( (e) => {
                setDados([])
                setLoading(false)
                setMsg('Erro: falha na obtenção dos dados!')
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