// 19/04/22

import { NextApiRequest, NextApiResponse } from 'next'
import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);

// Parâmetros do request:
const etcm = process.env.NEXT_PUBLIC_ETCM_URL

const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify({IdUsuarioExterno: 28, CodUg: 301692})
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const cod = req.query.cod;
  const url = `${etcm}/api/portaljurisdicionado/processual/caixaPostal`;

  const response = await fetch(url, options);

  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/json');

  await pipeline(response.body, res);
};

export default handler;
