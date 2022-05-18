// 09/05/22

import React, { useState } from 'react'
import FileUploader from 'devextreme-react/file-uploader';
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import notify from 'devextreme/ui/notify';
import styles from '../styles/protocoloEnviar.module.css'


export default function ProtocoloEnviar() {

  //const url = '/api/uploadDoc'
  //const url = '/api/portaljurisdicionado/processual/uploadArquivo'
  
  //const url = 'http://localhost:2446/api/portaljurisdicionado/processual/upload'
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

      <input type='text' name='msg' value='teste' />

      <div className={styles.fileuploaderContainer}>
        <FileUploader
          selectButtonText="Selecionar arquivo"
          labelText=""
          uploadButtonText='Subir arquivo'
          multiple={true}
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
        onClick={onClick}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  )

  async function onClick() {

    const js = {
      msg: 'teste 345',
      anexo: arquivos[0]
    }


    const fd = new FormData()

    fd.append('msg', 'teste 123')
    fd.append('anexo', arquivos[0])

/*

headers: {
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data'
  'Content-Type': 'application/json'
},

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


  function f_onValueChange(e) {
    const files = e.value;
    const qt = e.length

    setArquivos(files)

    //console.log('f_onValueChange', files )
  }


  // Exemplo de upload de imagem:
  const [image, setImage] = useState('')

  const uploadImage = async e => {


    const files = e.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'darwin')

    setLoading(true)

    const res = await fetch ('url', {
      method: 'POST',
      body: data
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

