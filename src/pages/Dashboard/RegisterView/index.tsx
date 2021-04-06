import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { SiIfixit } from 'react-icons/si';
import { useHistory, useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { BiSearch } from 'react-icons/bi';
import { Container, ButtonDiv, InfoDiv, SearchDiv } from './styles';
import api from '../../../services/api';

import Title from '../../../components/Title';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';
import { useToast } from '../../../hooks/ToastContext';

import Table from '../../../components/RegisterProductsTable';

import { ProductProps, RegisterProps } from '../../../utils/props';
import getDateBr from '../../../utils/getDateBr';
import Input from '../../../components/Input';

interface ParamsProps {
  id: string;
}

interface SearchProps {
  search: string;
}

const RegisterView: React.FC = () => {
  const { addToast } = useToast();
  const { id } = useParams<ParamsProps>();

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [products, setProducts] = useState<ProductProps[] | undefined>(
    undefined
  );
  const [register, setRegister] = useState<RegisterProps | undefined>(
    undefined
  );
  const [productsBuffer, setProductsBuffer] = useState({} as ProductProps[]);

  const handleSearch = useCallback(
    (data: SearchProps) => {
      if (data.search.length === 0) {
        setProducts(productsBuffer);
      }
      if (register) {
        setProducts(
          register.products.filter((product) =>
            product.name.includes(data.search)
          )
        );
      }
    },
    [register, productsBuffer]
  );

  const handleConfirm = useCallback(() => {
    try {
      api.delete(`registers/${register?.id}`);
      addToast({
        type: 'success',
        title: 'Registro excluído com sucesso.',
      });
      setTimeout(() => {
        history.go(-1);
      }, 1000);
    } catch (err) {
      throw new Error(err);
    }
  }, [register, addToast, history]);

  useEffect(() => {
    api.get(`registers/${id}`).then((response) => {
      setRegister(response.data);
      setProducts(response.data.products);
      setProductsBuffer(response.data.products);
    });
  }, [id]);

  if (register) {
    if (products) {
      return (
        <Container>
          <Title>
            <h1>Registro de {register.type === 'I' ? 'entrada' : 'saída'}</h1>
          </Title>
          <ButtonDiv>
            <Alert
              key="alert"
              title="Tem certeza que deseja excluir?"
              description={
                register.type === 'I'
                  ? 'Os produtos serão excluídos permanentemente.'
                  : 'Os produtos retornarão para o estoque e demais informações serão perdidas.'
              }
              icon={BsFillExclamationTriangleFill}
              open
              button
              handleConfirm={handleConfirm}
              colorIcon="#c74444"
              iconButton={SiIfixit}
            >
              Excluir
            </Alert>
          </ButtonDiv>
          <InfoDiv>
            <h1>Informações</h1>
            <div>
              <h2>Usuário: </h2>
              <h3>{register.user.name}</h3>
            </div>
            <div>
              <h2>Data de criação: </h2>
              <h3>{getDateBr(register.created_at)}</h3>
            </div>
          </InfoDiv>
          <SearchDiv>
            <Form ref={formRef} onSubmit={handleSearch}>
              <Input
                name="search"
                icon={BiSearch}
                placeholder="Buscar produto..."
              />
              <button type="submit"> </button>
            </Form>
          </SearchDiv>
          <Table products={products} />
        </Container>
      );
    }
    setProducts(register.products);
  }
  return <Loading />;
};

export default RegisterView;
