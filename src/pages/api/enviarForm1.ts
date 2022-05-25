// 17/05/22
// Envia form com dados + PDF (24/05/22)

//import * as FormData from 'form-data'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

// Essa api não tem parâmetros na assinatura
// Com parâmetros gera erro 415
const url = 'http://localhost:2446/api/portaljurisdicionado/processual/uploadDoc'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  var arq = fs.readFileSync('./public/sample.pdf');

  const FormData = require("form-data")

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