// https://github.com/wojtekmaj/react-pdf  (19/03/22)
// > npm install react-pdf

import React from 'react'
import { Box, Grid, SvgIconProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import Split from 'react-split'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import styles from './VisualizadorAtos.module.css'

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// const MyItem = styled(TreeItem)({
//   fontSize:'10px'
// })

// interface iPeca {
//   id: number
//   nm_peca: string
// }

// interface iProps {
//   codProtocolo: string,
//   atos: iPeca[]
// }

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};


export default function VisualizadorAtos<iProps>({ codProtocolo, atos }) {

  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const [urlPeca, setUrlPeca] = React.useState('')

  function f_itemClick(codArquivo) {
    const url = `/api/getPdf?cod=${codArquivo}`
    setUrlPeca(url)
  }

  const DocumentWrapper = styled("div")({
    maxHeight: "600px",
    overflowY: "auto"
  });

  return (

    <Grid
      container
      direction='column'
      spacing={0}
      margin='0px'
      padding='5px'
      borderRadius='5px'
      sx={{backgroundColor:'#ccc' }}
    >
      <Grid
        item xs={12}
        padding='5px'
        borderRadius='5px'
        sx={{backgroundColor:'#e8eaf6'}}
      >

        <Split
          sizes={[40,60]}
          minSize={[10,30]}
          style={{ display:'flex'}}
        >
  
          <div
            style={{ overflow:'scroll',}}
          >
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultExpanded={['root']}
              sx={{
                color:'blue'
              }}
            >
              <TreeItem nodeId='root' label={codProtocolo} sx={{height:'80vh'}}>
                { atos && atos.map( (p, i) =>

                  <TreeItem
                    nodeId={`${i}`}
                    label={`${p.id} - ${p.nm_peca}`}
                    key={p.id}
                    onClick={() => f_itemClick(p.arquivo)}
                    sx={{
                      '& .MuiTreeItem-label': {
                        fontSize: '0.7rem',
                      },
                    }}
                    title={p.nm_tipo}
                  />

                )}
              </TreeItem>
            </TreeView>

          </div>

          <div style={{ overflow:'scroll' }}>

            <DocumentWrapper>

              <Document
                file={{url:`${urlPeca}`}}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >

                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>

            </DocumentWrapper>

            <p>
              Page {pageNumber} of {numPages}
            </p>

          </div>

        </Split>

      </Grid>

    </Grid>

    //</Box>

  )
}
