import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import api from '../../../services/api';
import Table from '../../../components/ProductTable';
import Title from '../../../components/Title';

import { Container } from './styles';

import { ProductProps } from '../../../utils/props';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <Container>
      <Title>
        <h1>Produtos</h1>
      </Title>
      <Table products={products} />
    </Container>
  );
};

export default Products;
