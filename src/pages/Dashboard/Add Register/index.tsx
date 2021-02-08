import React, { useCallback, useState } from 'react';
import { ImPlus } from 'react-icons/im';
import * as Yup from 'yup';

import Table from '../../../components/RegisterProductsTable';
import Title from '../../../components/Title';
import AddProduct from '../../../components/AddProduct';

import Select, { Options } from '../../../components/Select';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

import { Container, Content, ButtonDiv } from './styles';
import { ProductProps, ProductPropsAdd } from '../../../utils/props';

const registerOptions: Options[] = [
  { id: 'I', name: 'Entrada' },
  { id: 'O', name: 'Saída' },
];

const AddRegister: React.FC = () => {
  const [registerType, setRegisterType] = useState('I');
  const [products, setProducts] = useState<ProductProps[] | undefined>();
  const [readOnly, setReadOnly] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  const handleSubmitProduct = useCallback((data: ProductPropsAdd): void => {
    console.log(data);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { selectedIndex } = e.target.options;
      const eventType = e.target.options[selectedIndex].getAttribute('id');
      if (eventType) {
        setRegisterType(eventType);
      }
    },
    []
  );

  const handleAddProduct = useCallback(() => {
    if (registerType === 'I') {
      setAddProduct(true);
    }
    setReadOnly(true);
  }, [registerType]);

  return (
    <Container>
      <Title>
        <h1>Adicionar registro</h1>
      </Title>
      <Content>
        <h2>Tipo:</h2>
        <Select
          label=""
          options={registerOptions}
          readOnly={readOnly}
          onChange={handleChange}
        />
      </Content>
      {products && <Table products={products} />}
      <ButtonDiv>
        <Button onClick={handleAddProduct}>
          <ImPlus />
          Adicionar produto
        </Button>
      </ButtonDiv>
      {addProduct && <AddProduct handleSubmitProduct={handleSubmitProduct} />}
    </Container>
  );
};

export default AddRegister;
