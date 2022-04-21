import React, { useCallback, useRef, useState } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { CircularProgress } from '@material-ui/core';
import {
  Container,
  Background,
  Content,
  LinkButton,
  useStyles,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';
import GenericAlert from '../../components/GenericAlert';

import logoImg from '../../assets/logo_completa.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  login: string;
  password: string;
}
interface AxiosResponseProps {
  id: string;
  administrator: boolean;
  email: string;
}

const SignIn: React.FC = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [recoverMessage, setRecoverMessage] = useState('');
  const [recoverMessageBoolean, setRecoverMessageBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleAlertReset = useCallback(() => {
    setRecoverMessageBoolean(false);
    setRecoverMessage('');
  }, []);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      if (forgotPassword) {
        setForgotPassword(false);
        try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            login: Yup.string().required(
              'Informe seu usuário para recuperar sua senha'
            ),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
          setIsLoading(true);
          const axiosResponse = await api
            .get(`recover/?login=${data.login}`)
            .catch((error) => {
              if (error.response.status === 404) {
                addToast({
                  title: 'Erro',
                  type: 'error',
                  description: 'Usuário não encontrado',
                });
                setIsLoading(false);
              }
              if (error.response.status === 400) {
                setRecoverMessage(
                  'Não é possível redefinir sua senha. Contate um administrador do sistema.'
                );
                setRecoverMessageBoolean(true);
                setIsLoading(false);
              }
            });
          // if somente para que o response não seja any | undefined
          if (!axiosResponse) {
            return;
          }
          const userRecover: AxiosResponseProps = axiosResponse.data;

          api
            .post(`recover/${userRecover.id}`, {
              contentType: 'application/json',
            })
            .then(() => {
              setIsLoading(false);
              setRecoverMessage(
                `Em alguns instantes você receberá instruções para redefinir sua senha em ${userRecover.email}.`
              );
            });

          setRecoverMessageBoolean(true);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidationErrors(error);
            formRef.current?.setErrors(errors);

            return;
          }
          throw new Error(error);
        }
      } else {
        try {
          formRef.current?.setErrors({});
          setIsLoading(true);

          const schema = Yup.object().shape({
            login: Yup.string().required('Usuário obrigatório'),
            password: Yup.string().required('Senha obrigatória'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
          await signIn({
            login: data.login,
            password: data.password,
          });
        } catch (err) {
          setIsLoading(false);
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
          }

          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Ocorreu um erro ao fazer login. Cheque as credenciais.',
          });
        }
      }
      setForgotPassword(false);
    },
    [signIn, addToast, forgotPassword]
  );

  const handleForgotMyPassword = useCallback(() => {
    setForgotPassword(true);
  }, []);

  return (
    <>
      {recoverMessageBoolean && recoverMessage.length !== 0 && (
        <GenericAlert
          title={recoverMessage}
          handleConfirm={handleAlertReset}
          open
          confirmColor="#82af99"
          noCancelButton
        />
      )}
      <Container>
        <Content>
          {isLoading ? (
            <CircularProgress className={classes.colorPrimary} />
          ) : (
            <>
              <div>
                <img src={logoImg} alt="" />
              </div>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Input name="login" icon={FiUser} placeholder="Usuário" />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />
                <Button type="submit">Entrar</Button>
                <LinkButton type="submit" onClick={handleForgotMyPassword}>
                  Esqueci minha senha
                </LinkButton>
              </Form>
            </>
          )}
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
