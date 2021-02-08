import React, { useCallback, useState } from 'react';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SiIfixit } from 'react-icons/si';

import { useToast } from '../../hooks/ToastContext';

import { ButtonExclude, useStyles } from './styles';
import api from '../../services/api';

interface AlertProps {
  title: string;
  description?: string;
  registerId: string;
}

const Alert: React.FC<AlertProps> = ({ title, description, registerId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [toRegisters, setToRegisters] = useState(false);

  const { addToast } = useToast();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    try {
      api.delete(`registers/${registerId}`).then(() => {
        setTimeout(() => setToRegisters(true), 1500);
      });
      addToast({
        type: 'success',
        title: 'Registro excluído com sucesso.',
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [registerId, addToast]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      {toRegisters ? <Redirect to="/dashboard/registers" /> : null}
      <ButtonExclude type="button" onClick={handleClickOpen}>
        <SiIfixit />
        Excluir
      </ButtonExclude>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <BsFillExclamationTriangleFill className={classes.icon} size={45} />
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            className={classes.colorPrimary}
            color="primary"
          >
            Confirmar
          </Button>
          <Button
            onClick={handleCancel}
            className={classes.colorSecondary}
            color="secondary"
            autoFocus
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
