import React, { useCallback, useEffect, useState } from 'react'
import 'devextreme/dist/css/dx.light.css';
import Button2 from 'devextreme-react/button';
import {
  DataGrid,
  Column,
  Selection,
  Export,
  Button,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

//import 'devextreme/dist/css/dx.light.css';
//import 'devextreme/dist/css/dx.dark.css';
//import 'devextreme/dist/css/dx.material.blue.light.compact.css';
//import 'devextreme/dist/css/dx.material.teal.light.compact.css';
import 'devextreme/dist/css/dx.material.purple.light.compact.css';

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
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Portal-Mesa.xlsx"); 
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

export default function Mesa() {

  const [timeStamp, setTimeStamp] = useState<string>()
  const [dt, setDt] = useState([])

  useEffect(() => {
    const f = fetch("/api/getMesa")
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
          keyExpr="PROTOCOLO"
          dataSource={dt}
          allowColumnResizing={true}
          showBorders={true}
          rowAlternationEnabled={true}
          onSelectionChanged={selectItem}
          style={{padding:"10px 0px"}}
          onExporting={exportGrid}
        >
          <Selection mode="single" />

          <SearchPanel visible={true} highlightCaseSensitive={true} />

          <Column type="buttons" width={110}>
            <Button hint="Clone" icon="find" visible={true} disabled={false} onClick={cloneIconClick} />
          </Column>

          <Column caption='Protocolo'   dataField="COD_TCE" dataType="string" width={110} />
          <Column caption='Processo'    dataField="PROCESSO"    dataType="string" width={150} />
          <Column caption='Tipo'        dataField="TIPO_PROTOCOLO" dataType="string" width={120} />
          <Column caption='Ofício'      dataField="NR_OFICIO" dataType="string" width={100} />
          <Column caption='Ano Ofício'  dataField="ANO_OFICIO" dataType="string" width={100} />
          <Column caption='Meio de Entrada'  dataField="MEIOENTRADA" dataType="string" width={100} />
          <Column caption='Registro'  dataField="DATA_ENTRADA" dataType="string" width={100} />

          <Column caption='Tipo'      dataField="TIPO" dataType="string" width={100} />
          <Column caption='Exercício' dataField="ANO_EXERCICIO" dataType="string" width={100} />
          <Column caption='Assunto'   dataField="TXT_ASSUNTO" dataType="string" width={100} />
          <Column caption='Área'      dataField="AREA" dataType="string" width={100} />
          <Column caption='Unidade Gestora'   dataField="NM_UNID_GESTORA" dataType="string" width={100} />
          <Column caption='Motivo'   dataField="MOTIVO" dataType="string" width={100} />

          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />

          <Export enabled={true} allowExportSelectedData={false} />
        </DataGrid>
      </div>
    </>
  )
}
