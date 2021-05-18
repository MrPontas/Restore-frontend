import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { CircularProgress } from '@material-ui/core';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import {
  Container,
  ErrorMessage,
  ErrorTitle,
  ErrorContainer,
  useStyles,
  Content,
  Background,
} from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ParamsProps {
  token: string;
}

interface SubmitProps {
  password: string;
  passwordRepeat: string;
}

const Recover: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { token } = useParams<ParamsProps>();
  const [valid, setValid] = useState({} as boolean);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const { addToast } = useToast();

  useEffect(() => {
    api
      .post(`recover/access/${token}`, {
        contentType: 'application/json',
      })
      .catch(() => {
        setValid(false);
      })
      .then((response) => {
        if (response) {
          setUserId(response.data);
          setValid(true);
        }
      });
  }, [token]);

  const handleSubmit = useCallback(
    async (data: SubmitProps) => {
      try {
        formRef.current?.setErrors({});
        setIsLoading(true);
        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
          repeatPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não conferem'
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .post(`/recover/setuser/${token}`, {
            id: userId,
            password: data.password,
          })
          .catch((err) => {
            throw new Error(err);
          })
          .then(() => {
            addToast({
              type: 'success',
              title: 'Sucesso',
              description: 'Senha redefinida com sucesso.',
            });
            setRedirect(true);
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
          title: 'Algo deu errado',
          description: 'Não foi possível redefinir sua senha.',
        });
        setRedirect(true);
        throw new Error(err);
      }
    },
    [userId, token, addToast]
  );
  if (redirect) return <Redirect to="/" />;
  if (valid === false)
    return (
      <Container>
        <ErrorContainer>
          <img src={logoImg} alt="" />
          <ErrorTitle>Ops!</ErrorTitle>
          <ErrorMessage>
            Sua solicitação para redefinir a senha expirou. Crie uma nova
            solicitação.
          </ErrorMessage>
        </ErrorContainer>
      </Container>
    );

  if (valid === true)
    return (
      <Container>
        <Background />
        <Content>
          {isLoading ? (
            <CircularProgress className={classes.colorPrimary} />
          ) : (
            <>
              <div>
                <img src={logoImg} alt="" />
              </div>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <h2>Crie uma nova senha</h2>
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />
                <Input
                  name="repeatPassword"
                  icon={FiLock}
                  type="password"
                  placeholder="Repetir senha"
                />
                <Button type="submit">Confirmar</Button>
              </Form>
            </>
          )}
        </Content>
      </Container>
    );
  return <></>;
};

export default Recover;
