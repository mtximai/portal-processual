// 17/05/22
import * as FormData from 'form-data'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

//const url = 'http://localhost:2446/api/protocolo/teste'
//const url = 'http://localhost:2446/api/protocolo/incluirprotocolo'
const url = 'http://localhost:2446/api/portaljurisdicionado/processual/uploadDoc'
//const url = 'http://localhost:2446/api/portaljurisdicionado/processual/uploadPessoa'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  var arq = fs.readFileSync('./public/sample.pdf');

  const FormData = require("form-data")
 
  const doc = {
    AnoExercicio: 2022,
    Documentos: [{
      CodDocumento: 100,
      Arquivo: {
        Nome:'MeuArquivo.pdf',
        Arquivo: arq
      }
    }]
  }

  /*
    body: JSON.stringify(doc)
      'Content-Type': 'application/json'
      'Content-Type': 'multipart/form-data'
  */


  const pessoa = {
    nome: 'Huguinho',
    idade: 66,
    anexo: arq
  }

  const fdPessoa = new FormData()
  fdPessoa.append('nome', 'Huguinho')
  fdPessoa.append('idade', 99)
  fdPessoa.append('anexo', arq, 'sample.pdf')
  
  const r = await fetch (url, {
    headers: {
      'Accept': 'application/json',
    },
    method: 'POST',
    body: fdPessoa
  })

  const r2 = await r.json()

  res.status(200).json({ msg: r2 })
}

export default handler;