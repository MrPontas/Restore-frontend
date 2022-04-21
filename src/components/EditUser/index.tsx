import React, { useCallback, useEffect, useState, useRef } from 'react';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import LabelInput from '../LabelInput';
import { UserProps } from '../../utils/props';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Loading from '../Loading';
import { GreenSwitch, StyledCancel, StyledConfirm, useStyles } from './styles';

interface SubmitProps extends UserProps {
  repeatPassowrd: string;
}
// #82af99

interface AlertProps extends DialogProps {
  openAlert?: boolean;
  handleConfirm: (user: UserProps) => void;
  handleCancel: () => void;
  userEdit: string;
}
const Alert: React.FC<AlertProps> = ({
  handleConfirm,
  handleCancel,
  openAlert,
  userEdit,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);
  const classes = useStyles();
  const { addToast } = useToast();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [userEditObject, setUserEditObject] = useState({} as UserProps);
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    if (userEdit)
      api.get(`users/${userEdit}`).then((response) => {
        setUserEditObject(response.data[0]);
        setChecked(response.data[0].administrator);
        setUserLoaded(true);
      });
  }, [userEdit]);
  useEffect(() => {
    if (openAlert) setOpen(true);
  }, [openAlert]);

  const handleSubmit = useCallback(
    async (data: SubmitProps) => {
      formRef.current?.setErrors({});
      try {
        let schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          login: Yup.string()
            .required('Login obrigatório')
            .matches(
              /^[a-z.]+$/,
              `Os caracteres permitidos são letras, números e ponto`
            ),
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
          title: 'Usuário editado com sucesso.',
        });

        setOpen(false);
        const userEdited: UserProps = {
          id: userEdit,
          name: data.name,
          password: data.password,
          administrator: checked,
          login: data.login,
          email: data.email,
        };
        handleConfirm(userEdited);
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
    [addToast, handleConfirm, checked, userEdit]
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
      <DialogTitle id="alert-dialog-title">Editar usuário</DialogTitle>

      <DialogContent className={classes.dialog}>
        <DialogContentText id="alert-dialog-description">
          {userLoaded ? (
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              id="user-form"
              className={classes.form}
            >
              <div className={classes.leftDiv}>
                <LabelInput
                  label="Nome"
                  name="name"
                  defaultValue={userEditObject.name}
                />
                <LabelInput
                  label="Usuário"
                  name="login"
                  defaultValue={userEditObject.login}
                />
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
                {checked && (
                  <LabelInput
                    label="E-mail"
                    name="email"
                    defaultValue={userEditObject.email}
                  />
                )}
              </div>
            </Form>
          ) : (
            <Loading />
          )}
        </DialogContentText>
        <DialogActions>
          <StyledCancel
            onClick={handleCancelButton}
            color="secondary"
            autoFocus
          >
            Cancelar
          </StyledCancel>
          <StyledConfirm type="submit" form="user-form" color="primary">
            Confirmar
          </StyledConfirm>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
