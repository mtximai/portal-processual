// Leitura de variável ambiental(13/06/22)

//import * as FormData from 'form-data'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const v = process.env.MY_VAR
  res.status(200).json({ name: v })
}

export default handler;