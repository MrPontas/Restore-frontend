import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { BiSearch } from 'react-icons/bi';
import api from '../../../services/api';

import Input from '../../../components/Input';

import ProductsTable from '../../../components/ProductTable';
import ProductsSearchedTable from '../../../components/RegisterProductsTable';

import { Container, Title } from './styles';
import { ProductProps } from '../../../utils/props';

interface SearchProps {
  search: string;
}

const Products: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [productsSearched, setProductsSearched] = useState<
    ProductProps[] | undefined
  >(undefined);

  const handleSearch = useCallback(
    (data: SearchProps) => {
      if (data.search.length === 0) {
        setProductsSearched(undefined);
      }
      api.get(`products/?name=${data.search}`).then((products) => {
        setProductsSearched(products.data);
      });
    },
    [setProductsSearched]
  );

  return (
    <Container>
      <Title>
        <h1>Produtos</h1>
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input name="search" icon={BiSearch} placeholder="Buscar nome..." />
          <button type="submit"> </button>
        </Form>
      </Title>
      {productsSearched && (
        <ProductsSearchedTable products={productsSearched} />
      )}
      {!productsSearched && <ProductsTable />}
    </Container>
  );
};

export default Products;
