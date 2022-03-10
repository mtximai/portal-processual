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
  Tooltip, Box, Grid
} from '@mui/material';

import { Help, Search } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';


export default function CadastroArea() {

  const columns = [
    { field: 'id', headerName: 'Código', width: 90 },
    { field: 'nome',
      headerName: 'Nome',
      width: 400,
      editable: false}
  ];

  const [linhas, setLinhas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  
  // Obtém dados da API  
  useEffect(() => {
    fetch("http://localhost:2446/api/portaljurisdicionado/AreaAtual")
      .then((data) => data.json())
      .then((data) => {

      //let j = JSON.parse(data)
      //var x = j.map((e : Area, i : number) => { return {"id": i, "nome": e.nome}} )

      setLinhas(data)
      setIsLoading(false)
    })

  }, [])


  function obterDados() {
    if (isLoading)
      setIsLoading(false)
    else
      setIsLoading(true)
  }


  return (
    <Card>
      <CardHeader title="Cadastro de Áreas" />

      <CardContent>

        <Box display="flex" justifyContent="flex-begin" p={2} >

          <Tooltip title="Preencha o campo protocolo e clique no botão para pesquisar">
            <Help sx={{ color: 'blue', mr: 1, my: 0.5 } } />
          </Tooltip>

          <Button color="primary" variant="contained" size="small" startIcon={<Search />}
              onClick={() => { obterDados() }} >
              Pesquisar
          </Button>

          {isLoading  && <CircularProgress color="secondary" />} 
          {!isLoading && <h3><span>  Successfully API Loaded Data </span></h3>}

        </Box>

        <Divider />

        <Grid container spacing={3}>
            <Grid item md={2} xs={2} >
              <Box p={2}>
                <TextField id="idQtd" label="Registros" value={linhas.length} InputProps={{ readOnly: true }} size="small"
                  variant="outlined" />
                </Box>
            </Grid>
        </Grid>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={linhas} columns={columns}
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