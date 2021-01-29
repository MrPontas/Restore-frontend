import React, { useCallback, useRef } from 'react';
import { GiClothes } from 'react-icons/gi';
import { FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Background, Content } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  login: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required('Nome obrigatório'),
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
          description: 'Ocorreu um erro ao fazer login. Cheque as credenciais.',
        });
      }
    },
    [signIn, addToast]
  );
  return (
    <>
      <Container>
        <Content>
          {/* <img src={logoImg} alt=""/> */}
          {/* <h1 id= "logo" icon={GiClothes}> </h1> */}
          <div>
            <GiClothes id="logo" />
            <h1>Restore</h1>
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
          </Form>
        </Content>
        <Background />
      </Container>

      {/* <Credits>Developed by Guilherme Pontarolo</Credits> */}
    </>
  );
};

export default SignIn;
