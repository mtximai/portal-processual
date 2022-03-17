// Mauro - 10/03/21

import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from '../styles/Layout.module.css'
import { useRouter } from 'next/router'
import MyToolbar, { useCorreioUpdate } from './MyToolbar'


const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean; }>
  ( ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(
    ({ theme, open }) => (
      {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }
    )
  );

const DrawerHeader = styled('div')( ({ theme }) => (
    {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  ));
  
export interface iContext {
  f_drawerTitleUpdate(title: string): void
  f_qtCorreioUpdate(qtCorreio: number): void
  f_qtNotificacaoUpdate(qtNotificacao: number): void
  qtCorreio: number
  qtNotificacao: number
}

const LayoutContext = React.createContext()

export function useLayoutUpdate() {
  return useContext(LayoutContext)
}

interface iProps {
  children: { children: JSX.Element }
  menuItens: {text: string, icon: any, path: string }[]
  tituloDrawer: string
  titulo: string
}


// Component
export default function Layout(props: iProps) {

  const [qtCorreio, setQtCorreio] = useState(2)
  const [qtNotificacao, setQtNotificacao] = useState(3)

  const [tituloDrawer, setTituloDrawer] = useState(props.tituloDrawer ?? 'Título Drawer')

  const children: { children: JSX.Element } = props.children
  
  const menuItens: {text: string, icon: any, path: string }[] = props.menuItens

  const [titulo, setTitulo] = useState('Toolbar')

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  useEffect( () => {
    const item = menuItens.filter((e,i) => e.path == router.pathname)

    if (item.length >0) {
      setTitulo(item[0].text)
    }
  }, [menuItens, router.pathname])


  function f_drawerTitleUpdate(msg: string) {
    setTituloDrawer(msg)
  }

  function f_qtCorreioUpdate(n: number) {
    setQtCorreio(n)
  }

  function f_qtNotificacaoUpdate(n: number) {
    setQtNotificacao(n)
  }

  const mValue : iContext = {
    f_drawerTitleUpdate,
    f_qtCorreioUpdate,
    f_qtNotificacaoUpdate,
    qtCorreio,
    qtNotificacao
  }

  return (
    <LayoutContext.Provider value={mValue}>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>

          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap component="div">
              {titulo}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <MyToolbar qtCorreio={qtCorreio} qtNotificacao={qtNotificacao} />
          </Toolbar>

        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <h3>{tituloDrawer}</h3>

            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>

            {menuItens.map((e,i) =>

              (e.text !== '-') ?

                <ListItem button
                  key={i}
                  onClick={() => router.push(e.path) }
                  className = { e.path == router.pathname ? styles.active:''}
                >
                  <ListItemIcon>
                    {e.icon}
                  </ListItemIcon>

                  <ListItemText primary={e.text} />
                </ListItem>
                : <Divider key={i} />
            )}

          </List>

        </Drawer>

        <Main open={open}>
          <DrawerHeader />

          { children }
        </Main>

      </Box>
    </LayoutContext.Provider>

  );
}
