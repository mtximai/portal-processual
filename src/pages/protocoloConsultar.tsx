import React from 'react'
//import 'devextreme/dist/css/dx.material.purple.light.compact.css';

import 'devextreme-react/text-area';
import Button      from 'devextreme-react/button';
import DateBox     from 'devextreme-react/date-box';
import TextBox     from 'devextreme-react/text-box';
import DropDownBox from 'devextreme-react/drop-down-box';
import SelectBox   from 'devextreme-react/select-box';

import Box, { Item,} from 'devextreme-react/box';

import notify  from 'devextreme/ui/notify';

import Form, { SimpleItem, GroupItem, Label,} from 'devextreme-react/form';
import { DataGrid, Column, Selection, Export, LoadPanel, Grouping, GroupPanel, Pager, Paging, SearchPanel,} from 'devextreme-react/data-grid';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

import ValidationSummary from 'devextreme-react/validation-summary';

import {
  Validator,
  RequiredRule,
  CompareRule,
  CustomRule,
  EmailRule,
  PatternRule,
  StringLengthRule,
  RangeRule,
  AsyncRule,
} from 'devextreme-react/validator';
import { Warning } from '@mui/icons-material';


interface iCombo {
  cod: string
  nome: string
}

interface iFiltro {
  dtIni: string
  dtFim: string
  tpRemessa: string
  areaAtual: string
  situacaoAtual: string
}

const filtroIni: iFiltro = {
  dtIni: '01/01/2022',
  dtFim: '01/01/2022',
  tpRemessa: 'D',
  areaAtual: '',
  situacaoAtual: ''
}

const tpRemessa = [
  {cod: 'D', descricao: 'Documento'},
  {cod: 'P', descricao: 'Processo'},
]

const currentDate = new Date();
const maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 21));

export default function ProtocoloConsultar() {

  const [filtro, setFiltro] = React.useState<iFiltro>(filtroIni)
  const [msgDtFim, setMsgDtFim] = React.useState('')

  const [area, setArea] = React.useState<iCombo[]>([])
  const [situacao, setSituacao] = React.useState<iCombo[]>([])
  

  React.useEffect(() => {
    console.log(filtro)
  }, [filtro])



  React.useEffect(() => {
    fetch("/api/getAreas")
      .then((r) => r.json())
      .then((p) => setArea(p))

    fetch("/api/getSituacao")
      .then((r) => r.json())
      .then((p) => setSituacao(p))

  }, [])


  function f_click(e) {
    const { isValid } = e.validationGroup.validate(); 
    
    if (isValid) {
      notify('', 'success');
    }
    else {
      notify('Corrija os itens em vermelho!', 'error');
    }

  }
  
  function f_ValidarDtIni(e) {
    //const comp = e.component.option('text');
    console.log(e)

    const ini:number = (new Date(filtro.dtIni)).getTime()
    const fim:number = (new Date(filtro.dtFim)).getTime()

    let ok = false
    
    if (fim < ini) {
      setMsgDtFim('Data final não pode ser menor que a data inicial!')
    }
    else {
      ok = true
    }

    return ok
  }

  function f_ValidarDtFim(e) {
    //const comp = e.component.option('text');
    console.log(e)


    const ini:number = (new Date(filtro.dtIni)).getTime()
    const fim:number = (new Date(filtro.dtFim)).getTime()

    let ok = false
    
    if (fim < ini) {
      setMsgDtFim('Data final não pode ser menor que a data inicial!')
    }
    else {
      ok = true
    }

    return ok
  }


  return (
    <div>

      <Box
        direction="row"
        width="800px"
        height="100%"
      >
        <Item ratio={1}>
          <div className="rect demo-dark">

            <div className="dx-fieldset" style={{marginTop:'0px', marginBottom:'0px'}}>

              <div className="dx-field">
                <div className="dx-field-label">Data inicial</div>
                <div className="dx-field-value">
                  <DateBox
                    value={filtro.dtIni}
                    placeholder="dd/mm/yyyy"
                    showClearButton={true}
                    useMaskBehavior={true}
                    type="date"
                    displayFormat="dd/MM/yyyy"
                    invalidDateMessage="A data deve estar no seguinte formato: dd/MM/yyyy"
                    onValueChange={(p) => setFiltro({...filtro, dtIni: p}) }
                  >
                    <Validator validationGroup='validar'>
                      <CustomRule
                        validationCallback={f_ValidarDtIni}
                      />
                    </Validator>
                  </DateBox>
                </div>
              </div>

              <div className="dx-field">
                <div className="dx-field-label">Data final</div>
                <div className="dx-field-value">
                  <DateBox
                    value={filtro.dtFim}
                    placeholder="dd/mm/yyyy"
                    showClearButton={true}
                    useMaskBehavior={true}
                    type="date"
                    displayFormat="dd/MM/yyyy"
                    onValueChange={(p) => setFiltro({...filtro, dtFim: p}) }
                  >
                    <Validator validationGroup='validar'>
                      <CustomRule
                        validationCallback={f_ValidarDtFim}
                        message={msgDtFim}
                      />
                    </Validator>
                  </DateBox>
                </div>
              </div>

              <div className="dx-field">
                <div className="dx-field-label">Tipo de remessa</div>
                <div className="dx-field-value">
                  <SelectBox dataSource={tpRemessa}
                    displayExpr="descricao"
                    valueExpr="cod"
                    searchEnabled={true}
                    value={filtro.tpRemessa}
                    onValueChanged={(p) => setFiltro({...filtro, tpRemessa: p.value})}
                  >
                    <Validator validationGroup='validar'>
                      <RequiredRule message="Campor obrigatório!" />
                    </Validator>

                  </SelectBox>
                </div>
              </div>

            </div>

            <div className="dx-fieldset" style={{marginTop:'15px', marginBottom:'15px'}}>
              {/* <ValidationSummary id="summary"></ValidationSummary> */}
              
              <Button
                text="Limpar"
                style={{marginRight:'15px'}}
                type='default'
                stylingMode="outlined"
              />

              <Button
                text="Pesquisar"
                type='default'
                stylingMode="outlined"
                validationGroup='validar'
                onClick={f_click}
              />
              
              <ValidationSummary />
            </div>
          </div>
        </Item>

        {/* 2a COLUNA */}
        <Item ratio={1}>
          <div className="rect demo-light">

            <div className="dx-fieldset" style={{marginTop:'0px'}}>

              <div className="dx-field">
                <div className="dx-field-label">Área atual</div>
                <div className="dx-field-value">
                  <SelectBox dataSource={area}
                    displayExpr="nome"
                    valueExpr="cod"
                    defaultValue={'P'}
                    searchEnabled={true}
                    value={filtro.tpRemessa}
                    onValueChanged={(p) => setFiltro({...filtro, tpRemessa: p.value})}
                  />
                </div>
              </div>

              <div className="dx-field">
                <div className="dx-field-label">Situação atual</div>
                <div className="dx-field-value">
                  <SelectBox dataSource={situacao}
                    displayExpr="nome"
                    valueExpr="cod"
                    defaultValue={'P'}
                    searchEnabled={true}
                    value={filtro.tpRemessa}
                    onValueChanged={(p) => setFiltro({...filtro, tpRemessa: p.value})}
                  />
                </div>
              </div>

            </div>
          </div>

        </Item>

      </Box>

      <div style={{ height:"600px", width:'100%', padding:"5px", overflow:'auto', border: '1px solid #cccc', borderRadius:'5px' }}>

        <DataGrid  
          id="dataGrid"
          keyExpr="PROTOCOLO"
          dataSource={'../data/mesa.json'}
          allowColumnResizing={true}
          showBorders={true}
          rowAlternationEnabled={true}
          // onSelectionChanged={selectItem}
          style={{padding:"5px"}}
          onExporting={exportGrid}
          height={580}
        >
          <LoadPanel enabled />

          <Selection mode="single" />

          <SearchPanel visible={true} highlightCaseSensitive={true} />

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

          {/* <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} /> */}
          <Paging defaultPageSize={10} />

          <Export enabled={true} allowExportSelectedData={false} />
        </DataGrid>
      </div>

    </div>
  )
}


function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function exportGrid(e) {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("protocolos-portal"); 
  
  exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "protocolos.xlsx"); 
      }); 
    });
    
    e.cancel = true; 
  }
  
  // type: 'percent|currency'
  const gdpFormat = {
    type: 'currency',
  precision: 2,
};
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}
