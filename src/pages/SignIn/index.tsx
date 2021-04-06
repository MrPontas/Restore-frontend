import React, { useCallback, useRef, useState } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Background, Content, LinkButton } from './styles';
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
  const [alertUserNotFound, setAlertUserNotFound] = useState(false);
  const [recoverMessage, setRecoverMessage] = useState('');
  const [recoverMessageBoolean, setRecoverMessageBoolean] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleAlertReset = useCallback(() => {
    setAlertUserNotFound(false);
    setRecoverMessageBoolean(false);
    setRecoverMessageBoolean(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      if (forgotPassword) {
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
          const axiosResponse = await api
            .get(`recover/?login=${data.login}`)
            .catch((error) => {
              throw new Error(error);
            });
          const userRecover: AxiosResponseProps = axiosResponse.data;
          if (!userRecover) {
            setRecoverMessage(
              'Não é possível redefinir sua senha. Contate um administrador do sistema.'
            );
          } else {
            api
              .post(`recover/${userRecover.id}`, {
                contentType: 'application/json',
              })
              .then(() => {
                setRecoverMessage(
                  `Foram enviadas instruções para redefinição de sua senha em ${userRecover.email}`
                );
              });
          }
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
      {alertUserNotFound && recoverMessage.length !== 0 && (
        <GenericAlert
          title="Usuário não encontrado :("
          handleConfirm={handleAlertReset}
          handleCancel={handleAlertReset}
          open
          noCancelButton
        />
      )}
      {recoverMessageBoolean && recoverMessage.length !== 0 && (
        <GenericAlert
          title={recoverMessage}
          handleConfirm={handleAlertReset}
          handleCancel={handleAlertReset}
          open
          confirmColor="#82af99"
          noCancelButton
        />
      )}
      <Container>
        <Content>
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
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
