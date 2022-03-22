// 19/03/22

import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import Split from 'react-split'
import styles from '../styles/VisualizadorAtos.module.css'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { styled, useTheme } from '@mui/material/styles';


const myItem = styled(TreeItem, {})({
  fontSize:'small'
})

interface iPeca {
  id: number
  nm_peca: string
}

interface iProps {
  codProtocolo: string,
  atos: iPeca[]
}

export default function VisualizadorAtos<iProps>({ codProtocolo, atos }) {

  return (
    <Grid
      container
      direction='column'
      style={{backgroundColor:'#ccc'}}
      spacing={0}
      margin='0px'
      padding='5px'
      borderRadius='5px'
    >
      <Grid
        item xs={12}
        alignSelf='center'
        style={{backgroundColor:'#ccc', color:'blue'}}
        padding='0px 20px'
        borderRadius='5px'
      >
        <Typography fontWeight='bold'>Visualizador de Atos: {codProtocolo}</Typography>
      </Grid>

      <Grid
        item xs={12}
        style={{backgroundColor:'#637bfe'}}
        padding='5px'
        borderRadius='5px'
        height='800px'
      >

        <Split
          className={styles.flex}
          sizes={[40,60]}
          minSize={[10,30]}
          style={{ height: 'calc(100vh - 4rem)' }}
        >
  
          <div className={styles.teste1}>
            Peças

            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 'calc(100vh - 8rem)', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >

              <TreeItem nodeId="0" label={codProtocolo} style={{fontSize: '0.5em'}}>
                { atos && atos.map( (p, i) => <TreeItem nodeId={i+1} label={`${p.id} - ${p.nm_peca}`}
                  sx={{fontSize:'small'}}
                   />)}
              </TreeItem>

              {/* <myItem label="Teste">

              </myItem> */}

            </TreeView>

          </div>

          <div className={styles.teste2}>

            <iframe src="https://portal.tcm.sp.gov.br/Management/GestaoPublicacao/Documento?id=86618"
              width="800"
              height="800"
            />

          </div>

        </Split>

      </Grid>

    </Grid>

  )
}
