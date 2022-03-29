// 26/03/22 - Baixar um arquivo PDF

import React from 'react'
import { Button, styled } from '@mui/material'
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

//console.log(pdfjs.version)

const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL

const DocumentWrapper = styled("div")({
  maxHeight: "600px",
  overflowY: "auto",
  outline:'1px solid lightblue'

});

export default function ViewPdf() {

  const [url, setUrl] = React.useState('')

  async function f_click() {
    console.log('click')

    fetch(`${mEtcm}/api/portaljurisdicionado/protocoloObterArquivo?cod=680EC86B0FF0C79D6F248B27C34405AE`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );

      const link = document.createElement('a');

      link.href = url;
      
      link.setAttribute(
        'download',
        `FileName.pdf`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });

  }

  function f_clickObterLink() {
    console.log('click')

    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      }

    fetch(
      `${mEtcm}/api/portaljurisdicionado/protocoloObterArquivo?cod=680EC86B0FF0C79D6F248B27C34405AE`,
      options
    )
    .then( response => response.blob())
    .then( blob => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );

      setUrl(url)
    });

  }

  function f_clickObterPDF() {
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      }

    const cod= `680EC86B0FF0C79D6F248B27C34405AE`

    fetch(`/api/getPdf?cod=${cod}`, options)
    .then( response => response.blob())
    .then( blob => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob])
      )
      
      setUrl(url)
    })
  }


  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{
      display:'flex',
      flexDirection:'column'
    }}>

      <Button onClick={ f_click }>Baixar PDF (client-side)</Button>

      <Button onClick={ f_clickObterLink }>Obter link (client-side)</Button>

      {/* <a href="/api/getPdf">Download PDF (via /api/getPdf)</a> */}

      <Button onClick={ f_clickObterPDF }>Obter PDF (pela API)</Button>


      <iframe src={url} />

      <DocumentWrapper>
        <Document
          file={{url:`${url}`}}
          onLoadSuccess={onDocumentLoadSuccess}
          >

          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>
      </DocumentWrapper>

    </div>
  )
}
