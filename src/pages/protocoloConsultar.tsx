import React from 'react'

import Form, {
  SimpleItem,
  GroupItem,
  Label,
} from 'devextreme-react/form';

import 'devextreme-react/text-area';
import Button from 'devextreme-react/button';

import {
  DataGrid,
  Column,
  Selection,
  Export,
  LoadPanel,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';

interface iFiltro {
  dtIni: string
  dtFim: string
  tpRemessa: number
  areaAtual: number
  situacaoAtual: number
}

const filtro: iFiltro = {
  dtIni: '01/01/2022',
  dtFim: '01/01/22022',
  tpRemessa: 0,
  areaAtual: 0,
  situacaoAtual: 0
}

export default function ProtocoloConsultar() {
  return (
    <div>

    <div style={{width: '600px'}}>

      <Form formData={filtro}>

        <GroupItem cssClass={''} colCount={2} caption='Filtro para consulta'>

          {/* Coluna 1 */}
          <GroupItem>
            <SimpleItem dataField="dtIni">
              <Label text="Dt.Entrada de" />
            </SimpleItem>

            <SimpleItem dataField="tpRemessa">
              <Label text="Tipo de Remessa" />
            </SimpleItem>

            <SimpleItem dataField="areaAtual">
              <Label text="Área atual" />
            </SimpleItem>

          </GroupItem>


          {/* Coluna 2 */}
          <GroupItem>
            <SimpleItem dataField="dtFim">
              <Label text="até" />
            </SimpleItem>
         
            <SimpleItem dataField="situacaoAtual">
              <Label text="Situação atual" />
            </SimpleItem>
          </GroupItem>

        {/* </GroupItem>

        <GroupItem> */}

        </GroupItem>


      </Form>

      <Button
        text="Limpar"
        style={{marginRight:'15px'}}
        type='default'
      />

      <Button
        text="Pesquisar"
        type='default'
      />

      <hr/>



    </div>

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
      height={540}
    >
      <LoadPanel enabled />

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
      <Column caption='Registro'  dataField="DATA_ENTRADA" dataType="date" format="dd/MM/yyyy" width={110} />

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

  </div>


  )
}
