// Mauro - 11/03/22

import React from 'react'
import { Button, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

type myProps = {
  onClick: React.MouseEventHandler
  loading?: boolean
  text?: string
  icon?: React.ReactNode
}

const progress = <CircularProgress color="secondary" size={20} />

export default function BtnProgress(props: myProps) {
  
  const { onClick, loading, text, icon } = props
  
  // Default:
  const mText = (text ?? 'Pesquisar')
  const mIcon = (icon ?? <Search />)
  const mLoading = (loading ?? false)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>

      <Button
        color="primary"
        variant="contained"
        size="small"
        startIcon={mLoading ? progress : mIcon}
        disabled={mLoading}
        onClick={ onClick }
        sx={{textTransform: 'none'}}
      >
        { mLoading ? 'Aguarde...' : mText }
      </Button>

    </Box>

  )
}
