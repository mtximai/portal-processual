// Dialog - 23/03/22 - Mauro
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';


export interface ConfirmationDialogRawProps {
  id: string;
  open: boolean;
  onClose: (value: boolean) => void;
  title: string
  children: React.ReactElement<any, any>
}

export default function DialogConfirmation(props: ConfirmationDialogRawProps) {

  const { onClose, open, ...other } = props;
  
  const title = props.title ?? "Título"
  const children = props.children

  const handleEntering = () => {

  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (

    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>{props.title}</DialogTitle>
      
      <DialogContent dividers>
        { children }
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>

    </Dialog>
  );
}
