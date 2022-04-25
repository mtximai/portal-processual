// 19/04/22 - Tela com DevExtreme

import React, { useCallback, useEffect, useState } from 'react'
import 'devextreme/dist/css/dx.material.purple.light.compact.css';

import Button2 from 'devextreme-react/button';
import {
  DataGrid,
  Column,
  Selection,
  Export,
  Button,
  LoadPanel,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import styles from '../../styles/Estilos.module.css'
import Box from '@mui/material/Box';

function exportGrid(e) {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Planilha"); 

  exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component
  }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Portal-CaixaPostal.xlsx"); 
      }); 
  });

  e.cancel = true; 
}

// type: 'percent|currency'
const gdpFormat = {
  type: 'currency',
  precision: 2,
};

const pageSizes = [10, 25, 50, 100];

export default function CaixaPostal() {

  const [timeStamp, setTimeStamp] = useState<string>()
  const [dt, setDt] = useState([])

  useEffect(() => {
    const f = fetch("/api/getCaixaPostal")
              .then((r) => r.json())
              .then((p) => setDt(p))
  }, [timeStamp])

  const selectItem = useCallback((e) => {
    e.component.byKey(e.currentSelectedRowKeys[0]).done(p => {
        console.log(p)
    });
  }, []);

  function f_atualizar() {
    setTimeStamp(Date())
  }

  function cloneIconClick(e) {
    console.log(e.row.rowIndex, e.row.data)

    // const employees = [...this.state.employees];
    // const clonedItem = { ...e.row.data, ID: service.getMaxID() };

    // employees.splice(e.row.rowIndex, 0, clonedItem);
    // this.setState({ employees });

    e.event.preventDefault();
  }

  return (
    <>
      <Box
        sx={{display:'flex', justifyContent:'space-between'}}
      >
        <Button2
          text="Atualizar"
          onClick={f_atualizar}
        />

        <span>{`Atualização: ${timeStamp}`}</span>

      </Box>

      <div style={{ height:"600px", padding:"0px", overflow:'auto' }}>
        <DataGrid  
          id="dataGrid"
          keyExpr="COD"
          dataSource={dt}
          allowColumnResizing={true}
          showBorders={true}
          rowAlternationEnabled={true}
          onSelectionChanged={selectItem}
          style={{padding:"10px 0px"}}
          onExporting={exportGrid}
          height={540}
        >
          <LoadPanel enabled />
          <Selection mode="single" />

          <SearchPanel visible={true} highlightCaseSensitive={true} />

          <Column type="buttons" width={110}>
            <Button hint="Notificação" icon="email" visible={true} disabled={false} onClick={cloneIconClick} />
          </Column>

          <Column caption='Protocolo'   dataField="COD_TCE" dataType="string" width={120} />
          <Column caption='Processo'    dataField="COD_PROCESSO"    dataType="string" width={140} />
          <Column caption='Área'        dataField="NM_AREA" dataType="string" width={250} />
          <Column caption='Status'            dataField="NM_STATUS" dataType="string" width={120} />
          <Column caption='Status leitura'    dataField="NM_STATUS_LEITURA" dataType="string" width={120} />
          <Column caption='Data ciência'      dataField="DATA_VISUALIZACAO" dataType="date" format="dd/MM/yyyy" width={120} />
          <Column caption='Data resposta'     dataField="DATA_RESPOSTA"     dataType="date" format="dd/MM/yyyy" width={120} />
          <Column caption='Data notificação'  dataField="DATA_NOTIFICACAO"  dataType="date" format="dd/MM/yyyy" width={130} />

          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />

          <Export enabled={true} allowExportSelectedData={false} />
        </DataGrid>

      </div>
    </>
  )
}
