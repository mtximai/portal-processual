import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next'
import Split from 'react-split'
import styles from '../styles/Visualizador.module.css'
import BtnSpinner from '../components/BtnSpinner';
import VisualizadorAtos from '../components/VisualizadorAtos';

interface iPeca {
  id: number
  nm_peca: string
  nm_tipo: string
}

interface iProps {
  cod: string,
  data: iPeca[]
}


export default function Visualizador<iProps>({ cod, data }) {

  //console.log(cod, data)

  const router = useRouter();

  // const [pecas, setPecas] = useState<iPeca[]>([])

  // useEffect(() => {
  //   setPecas(data)
  // },[data])


  function f_onClick() {
    const uri = `/visualizador?cod=007994/2020`
    router.push(uri)
  }

  if (cod?.startsWith('Erro:')) {
    return <Typography style={{color:'red'}}>{cod}</Typography>
  }

  return (
    <Grid
      container
      flexDirection='column'
    >
      <Grid item>
        <BtnSpinner onClick={f_onClick} />
      </Grid>

      <Grid item>
        <VisualizadorAtos codProtocolo={cod} atos={data} />
      </Grid>
    </Grid>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { query } = context
  const cod = query.cod ?? null
  
  try {
    
    let data = null

    if (cod) {
      const mEtcm = process.env.NEXT_PUBLIC_ETCM_URL
      const mUrl = `${mEtcm}/api/portaljurisdicionado/processual/protocoloObterPecas?cod=${cod}`

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
