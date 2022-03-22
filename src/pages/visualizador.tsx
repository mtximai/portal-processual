import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next'
import Split from 'react-split'
import styles from '../styles/Visualizador.module.css'
import BtnSpinner from '../components/BtnSpinner';
import ErrorPage from 'next/error'
import VisualizadorAtos from '../components/VisualizadorAtos';


interface iPeca {
  id: number
  nm_peca: string
}

interface iProps {
  cod: string,
  data: iPeca[]
}

export default function Visualizador<iProps>({ cod, data }) {

  //console.log(cod, data)

  if (cod?.startsWith('Erro:')) {
    return <Typography style={{color:'red'}}>{cod}</Typography>
  }


  // Utilizando componente para gerar Página de Erro
  // return <ErrorPage statusCode={204} />

  const router = useRouter();

  const [pecas, setPecas] = useState<iPeca[]>([])
  
  useEffect(() => {
    setPecas(data)
  },[data])


  function f_onClick() {
    const uri = `/visualizador?cod=007994/2020`
    router.push(uri)
  }

  return (
    <Grid container>
      <Grid item>
        <BtnSpinner onClick={f_onClick} />
      </Grid>

      <Grid item>
        <VisualizadorAtos codProtocolo={cod} atos={pecas} />
      </Grid>
    </Grid>
  )
}

//export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { query } = context
  const cod = query.cod ?? null
  
  try {
    
    let data = null

    if (cod) {
      const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL
      const mUrl = `${mEtcm}/api/portaljurisdicionado/protocoloObterPecas?cod=${cod}`

      // Busca dados
      const resp = await fetch(mUrl)

      if (resp.status == 200) {
        data = await resp.json()
      }
    }

    return {
      props: {
        cod: cod,
        data: data
      }
    }

  } catch {

    context.res.statusCode = 404

    return {
      props: {
        cod: 'Erro: Erro na chamada ao eTCM!',
        data: null
      }
    }
  }
}
