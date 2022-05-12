// 26/04/22
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const base = `http://${req.headers.host}/data/mesa.json`

  const d = await fetch(base)
            .then((r) =>r.json())

  res.status(200).json(d)
}

export default handler;