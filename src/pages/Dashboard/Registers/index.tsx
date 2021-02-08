import React from 'react';

import { NavLink } from 'react-router-dom';
import Table from '../../../components/RegisterTable';
import Title from '../../../components/Title';
import Button from '../../../components/Button';

import { Container, ButtonDiv } from './styles';

const Registers: React.FC = () => {
  return (
    <Container>
      <Title>
        <h1>Registros</h1>
      </Title>
      <ButtonDiv>
        <NavLink to="/dashboard/addRegister">
          <Button>Adicionar registro</Button>
        </NavLink>
      </ButtonDiv>
      <Table />
    </Container>
  );
};

export default Registers;
