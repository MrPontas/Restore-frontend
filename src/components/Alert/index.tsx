import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { IconBaseProps } from 'react-icons/lib';

import { ButtonExclude } from './styles';

interface AlertProps extends DialogProps {
  title: string;
  description?: string;
  widthButton?: number;
  heightButton?: number;
  colorButton?: string;
  colorIcon?: string;
  button: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  iconButton?: React.ComponentType<IconBaseProps>;
  openAlert?: boolean;
  handleConfirm: () => void;
}

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  icon: Icon,
  iconButton: IconB,
  colorIcon,
  handleConfirm,
  button,
  children,
  openAlert,
  ...rest
}) => {
  // '#c74444'
  const useStyles = makeStyles(() =>
    createStyles({
      colorPrimary: {
        color: '#c74444',
      },
      colorSecondary: {
        color: '#9c9b9b',
      },
      icon: {
        color: colorIcon,
        alignSelf: 'center',
        marginTop: '20px',
      },
    })
  );
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [toRegisters, setToRegisters] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);
  useEffect(() => {
    if (openAlert) setOpen(true);
  }, [openAlert]);
  const handleConfirmButton = useCallback(() => {
    setOpen(false);
    setToRegisters(true);
    handleConfirm();
  }, [handleConfirm]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      {toRegisters ? <Redirect to="/dashboard/registers" /> : null}
      {button && (
        <ButtonExclude type="button" onClick={handleClickOpen}>
          {IconB && <IconB />}
          {children}
        </ButtonExclude>
      )}

      <Dialog
        {...rest}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {Icon && <Icon className={classes.icon} size={45} />}
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmButton}
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
