// 03/05/22

import { NextApiRequest, NextApiResponse } from 'next'
import formidable from "formidable";
import fs from "fs";

const saveFile2 = async (file) => {
  console.log('saveFile', file)

  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`F://zTemp//xx//${file.name}`, data);
  await fs.unlinkSync(file.path);

  return;
};

async function saveFile(file) {
  //console.log('saveFile', file.path, file.name)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  //console.log(req.files)

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: 'f://zTemp//xx//',
  });

  form.parse(req, (err, fields, files) => {

    //console.log (fields, files)

    //saveFile2(files);
    return res.status(201).send("");
  });

};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
}
