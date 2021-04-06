import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { BiSearch } from 'react-icons/bi';
import { IoIosPaper } from 'react-icons/io';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import ProductsTable from '../../../components/ProductTable';
import ProductsSearchedTable from '../../../components/RegisterProductsTable';
import Report from '../../../components/Reports';

import { Container, Title, ButtonDiv } from './styles';
import { ProductProps } from '../../../utils/props';

interface SearchProps {
  search: string;
}

const Products: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [productsSearched, setProductsSearched] = useState<
    ProductProps[] | undefined
  >(undefined);
  const [openReport, setOpenReport] = useState(false);

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

  const handleCloseDialog = useCallback(() => {
    setOpenReport(false);
  }, []);

  const handleReportButton = useCallback(() => {
    setOpenReport(true);
  }, []);

  return (
    <Container>
      <Title>
        <h1>Produtos</h1>
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input name="search" icon={BiSearch} placeholder="Buscar nome..." />
          <button type="submit"> </button>
        </Form>
        <ButtonDiv>
          <Button onClick={handleReportButton}>
            <IoIosPaper />
            Gerar relatório
          </Button>
        </ButtonDiv>
      </Title>
      {productsSearched && (
        <ProductsSearchedTable products={productsSearched} />
      )}
      {!productsSearched && <ProductsTable />}
      {openReport && <Report handleCloseDialog={handleCloseDialog} />}
    </Container>
  );
};

export default Products;
