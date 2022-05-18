// 17/05/22
import * as FormData from 'form-data'

import { NextApiRequest, NextApiResponse } from 'next'

const url = 'http://localhost:2446/api/protocolo/teste'


/*



*/


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const FormData = require("form-data")
  
  const doc = {
    AnoExercicio: 2022,
    Documentos: [{
      CodDocumento: 100,
      Arquivo: {
        Nome:'MeuArquivo.pdf',
        Arquivo: null
      }
    }]
  }

/*
    body: JSON.stringify(doc)


*/


  const fd2 = new FormData()
  fd2.append('AnoExercicio', '2022')
  
  const r = await fetch (url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: fd2
  })

  const r2 = await r.json()

  //console.log('resposta:', r2)

  res.status(200).json({ msg: r2 })
}

export default handler;