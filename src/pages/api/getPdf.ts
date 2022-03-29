// 26/03/22
// https://stackoverflow.com/questions/68490546/how-to-download-a-file-on-next-js-using-an-api-route
// https://github.com/node-fetch/node-fetch#streams
// https://stackoverflow.com/questions/31105846/how-to-send-a-pdf-file-from-node-express-app-to-the-browser/31106110#31106110

// https://www.pdftron.com/blog/react/how-to-build-a-react-pdf-viewer/
// https://pspdfkit.com/blog/2021/how-to-build-a-reactjs-viewer-with-pdfjs/

// https://mozilla.github.io/pdf.js/examples/

import { NextApiRequest, NextApiResponse } from 'next'
import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);

// Parâmetros do request:
const etcm = process.env.NEXT_PUBLIC_ETCM_URL

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/pdf',
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const cod = req.query.cod;
  const url = `${etcm}/api/portaljurisdicionado/protocoloObterArquivo?cod=${cod}`;

  const response = await fetch(url, options);

  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=peca.pdf');

  await pipeline(response.body, res);
};

export default handler;
