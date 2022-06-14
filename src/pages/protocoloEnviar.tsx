// 09/05/22

import React, { useState } from 'react'
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import notify from 'devextreme/ui/notify';
import styles from '../styles/protocoloEnviar.module.css'


export default function ProtocoloEnviar() {

  const v = process.env.MY_VAR
  console.log('MY_VAR:', v)

  const x = process.env.NEXT_PUBLIC_ETCM_URL
  console.log('NEXT_PUBLIC_ETCM_URL:', x)


  const [msg, setMsg] = useState('teste')

  //const url = '/api/uploadDoc'
  //const url = '/api/portaljurisdicionado/processual/uploadArquivo'
  //const url = 'http://localhost:2446/api/portaljurisdicionado/processual/upload'
  //const url  = 'http://localhost:2446/api/protocolo/teste'

  const url = 'http://localhost:2446/api/portaljurisdicionado/processual/uploadDoc'

  const [loading, setLoading] = useState(false)
  const [arquivos, setArquivos] = React.useState([])

  const formRef = React.useRef()

  React.useEffect(() => {
    console.log('arquivos', arquivos.length)
  }, [arquivos])


  return (
    <form id="form" ref={formRef} className={styles.form} method="post" action={url}>

      <h3>ProtocoloEnviar</h3>

      <input type='text' name='msg' value={msg} onChange={(p) => setMsg(p.target.value)} />

      <div className={styles.fileuploaderContainer}>
        <FileUploader
          selectButtonText="Selecionar arquivo"
          labelText=""
          uploadButtonText='Subir arquivo'
          multiple={false}
          accept="*"
          uploadMode="useButtons"
          onValueChanged={f_onValueChange}
          uploadUrl={url}
        />
      </div>

      <Button
        className={styles.button}
        text="Enviar"
        type="success"
        onClick={onClickEnviar}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  )

  function f_onValueChange(e) {
    const files = e.value;
    const qt = e.length

    setArquivos(files)

    console.log('f_onValueChange', files )
  }

  
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  //   'Content-Type': 'multipart/form-data'
  // },


  async function onClickEnviar() {
    //notify('Uncomment the line to enable sending a form to the server.');
    //formElement.current.submit();

    console.log(arquivos[0])

    const doc = {
      nome: "Zezinho",
      idade: 10,
      anexo: arquivos[0]
    }

    const fd = new FormData()
    fd.append('nome', 'Huguinho')
    fd.append('idade', '56')
    fd.append('anexo', arquivos[0], arquivos[0].name)

    const fd2 = new FormData()
    fd2.append('AnoExercicio', '2022')

    /*

    Se 'Content-type' não for especificado > envia no formato 'Form Data'
        Api: Upload2([FromBody] Doc doc) > erro 415 qdo tentamos receber via parâmetro

    Se 'Content-type': 'application/json' > envia no formato 'Request Payload'
        body: fd
        
        Api: Upload2([FromBody] Doc doc) > recebe doc=null

    'Content-Type': 'application/json'
        body: JSON.stringify(doc)

        'Content-Type': 'application/json'
    */

    const res = await fetch (url, {
      headers: {
        'Accept': 'application/json',
      },
      method: 'POST',
        body: fd
    })

    const r = await res.json()

    console.log('resposta:', r)
  }


  // Exemplo de upload de imagem:
  const [image, setImage] = useState('')

  const uploadImage = async e => {
    const files = e.target.files

    const fd = new FormData()
    fd.append('file', files[0])
    fd.append('upload_preset', 'darwin')

    setLoading(true)

    const res = await fetch ('url', {
      method: 'POST',
      body: fd
    })

    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  const component = <div>
    <input
      type='file'
      name='file'
      placeholder='Upload an image'
      onChange={uploadImage}
    />
  </div>

}
