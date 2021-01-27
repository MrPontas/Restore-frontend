import React from 'react';
import {Container, Background, Content} from './styles';
import { GiClothes } from 'react-icons/gi';
import { FiLock, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () =>(
  <Container>
    <Content>
      {/* <img src={logoImg} alt=""/> */}
      {/* <h1 id= "logo" icon={GiClothes}> </h1> */}
      <div>
        <GiClothes id="logo" />
        <h1>Restore</h1>
      </div>

      <form >
        <h1>
          Login
        </h1>
        <Input name="login" icon={FiUser} placeholder="Usuário"/>
        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>


      </form>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
