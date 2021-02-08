import React from 'react';

import Table from '../../../components/ProductTable';
import Title from '../../../components/Title';

import { Container } from './styles';

const Products: React.FC = () => {
  return (
    <Container>
      <Title>
        <h1>Produtos</h1>
      </Title>
      <Table />
    </Container>
  );
};

export default Products;
