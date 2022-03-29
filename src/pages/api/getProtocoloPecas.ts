// 18/03/22

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('api: executando...')
  
  const r = { name: 'John Doe' }

  //const r = await fetch('http://localhost:2446/api/portaljurisdicionado/protocoloObterArquivo?cod=680EC86B0FF0C79D6F248B27C34405AE')
  //const d = x.json()

  console.log('api:', typeof r)

  res.status(200).json(r)

}
