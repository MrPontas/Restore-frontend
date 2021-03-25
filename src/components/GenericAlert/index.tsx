import React, { useCallback, useEffect, useState } from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() =>
  createStyles({
    colorPrimary: {
      color: '#c74444',
    },
    colorSecondary: {
      color: '#9c9b9b',
    },
  })
);

interface AlertProps extends DialogProps {
  title: string;
  description?: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const GenericAlert: React.FC<AlertProps> = ({
  title,
  description,
  handleConfirm,
  handleCancel,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleCancelAlert = useCallback(() => {
    setOpen(false);
    handleCancel();
  }, [handleCancel]);

  const handleConfirmAlert = useCallback(() => {
    setOpen(false);
    handleConfirm();
  }, [handleConfirm]);

  return (
    <Dialog
      {...rest}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirmAlert}
          className={classes.colorPrimary}
          color="primary"
        >
          Confirmar
        </Button>
        <Button
          onClick={handleCancelAlert}
          className={classes.colorSecondary}
          color="secondary"
          autoFocus
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericAlert;
