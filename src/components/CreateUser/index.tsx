import React, { useCallback, useEffect, useState, useRef } from 'react';

import { createStyles, makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import LabelInput from '../LabelInput';
import { UserProps } from '../../utils/props';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

export type UserCreated = Partial<UserProps>;

interface SubmitProps extends UserProps {
  repeatPassowrd: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    colorPrimary: {
      color: '#82af99',
    },
    colorSecondary: {
      color: '#9c9b9b',
    },
    form: {
      height: '300px',
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'center',
    },
    rightDiv: {
      width: '300px',
      margin: '0 40px',
    },
    leftDiv: {
      width: '300px',
      margin: '0 40px',
    },
    admDiv: {
      display: 'flex',
      marginTop: '37px',
      marginBottom: '18px',
      alignItems: 'center',
    },
    dialog: {
      margin: '0px 20px',
    },
  })
);
const GreenSwitch = withStyles({
  root: {},
  switchBase: {
    '&$checked': {
      color: '#82af99',
    },
    '&$checked + $track': {
      backgroundColor: '#82af99',
    },
  },
  checked: {},
  track: {},
})(Switch);

interface AlertProps extends DialogProps {
  openAlert?: boolean;
  handleConfirm: (user: UserCreated) => void;
  handleCancel: () => void;
}
const Alert: React.FC<AlertProps> = ({
  handleConfirm,
  handleCancel,
  openAlert,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);
  const classes = useStyles();
  const { addToast } = useToast();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (openAlert) setOpen(true);
  }, [openAlert]);

  const handleSubmit = useCallback(
    async (data: SubmitProps) => {
      formRef.current?.setErrors({});
      try {
        let schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          login: Yup.string().required('Login obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
          repeatPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não conferem'
          ),
        });
        const schemaAdministrator = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido.'),
        });
        let newSchema;
        if (checked) {
          newSchema = schema.concat(schemaAdministrator);
        } else {
          newSchema = schema;
        }
        await newSchema.validate(data, {
          abortEarly: false,
        });
        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso.',
        });

        setOpen(false);
        const userCreated: UserCreated = {
          name: data.name,
          password: data.password,
          administrator: checked,
          login: data.login,
          email: data.email,
        };
        handleConfirm(userCreated);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Ops!',
          type: 'error',
          description: 'Algo deu errado. Verifique as informações',
        });
      }
    },
    [addToast, handleConfirm, checked]
  );

  const handleSwitchChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const handleCancelButton = useCallback(() => {
    setOpen(false);
    handleCancel();
  }, [handleCancel]);

  return (
    <Dialog
      {...rest}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Cadastrar novo usuário</DialogTitle>

      <DialogContent className={classes.dialog}>
        <DialogContentText id="alert-dialog-description">
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            id="user-form"
            className={classes.form}
          >
            <div className={classes.leftDiv}>
              <LabelInput label="Nome" name="name" />
              <LabelInput label="Usuário" name="login" />
              <div className={classes.admDiv}>
                <GreenSwitch
                  checked={checked}
                  onChange={handleSwitchChange}
                  form="user-form"
                />
                <h3>Administrador</h3>
              </div>
            </div>
            <div className={classes.rightDiv}>
              <LabelInput label="Senha" name="password" type="password" />
              <LabelInput
                label="Repetir senha"
                name="repeatPassword"
                type="password"
              />
              {checked && <LabelInput label="E-mail" name="email" />}
            </div>
          </Form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={handleCancelButton}
            className={classes.colorSecondary}
            color="secondary"
            autoFocus
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="user-form"
            className={classes.colorPrimary}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
