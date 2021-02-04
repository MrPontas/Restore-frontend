import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import api from '../../../services/api';
import Table from '../../../components/ProductTable';
import Title from '../../../components/Title';

import { Container } from './styles';

import { ProductProps } from '../../../utils/props';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    load: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& .MuiCircularProgress-root': {
        borderColor: '#000',
      },
    },
  })
);

const Products: React.FC = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data);
    });
  }, []);
  if (products) {
    return (
      <Container>
        <Title>
          <h1>Produtos</h1>
        </Title>
        <Table products={products} />
      </Container>
    );
  }

  return (
    <Container className={classes.load}>
      <div>
        <CircularProgress />
      </div>
    </Container>
  );
};

export default Products;
