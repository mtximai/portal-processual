// 26/04/22

import { NextApiRequest, NextApiResponse } from 'next'
import d from '../../data/mesa.json'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(d)
}

export default handler;