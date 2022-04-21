import React, { useCallback, useEffect, useState } from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface AlertProps extends DialogProps {
  open: boolean;
  title: string;
  description?: string;
  handleConfirm: () => void;
  handleCancel?: () => void;
  confirmColor?: string;
  noCancelButton?: boolean;
}

const GenericAlert: React.FC<AlertProps> = ({
  title,
  description,
  handleConfirm,
  handleCancel,
  confirmColor = '#c74444',
  noCancelButton = false,
  ...rest
}) => {
  const useStyles = makeStyles(() =>
    createStyles({
      colorPrimary: {
        color: confirmColor,
      },
      colorSecondary: {
        color: '#9c9b9b',
      },
    })
  );
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleCancelAlert = useCallback(() => {
    setOpen(false);
    if (handleCancel) handleCancel();
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
        {!noCancelButton && (
          <Button
            onClick={handleCancelAlert}
            className={classes.colorSecondary}
            color="secondary"
            autoFocus
          >
            Cancelar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericAlert;
