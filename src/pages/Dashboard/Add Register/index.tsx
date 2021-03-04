import React, { useCallback, useState } from 'react';
import { ImPlus } from 'react-icons/im';

import { Redirect } from 'react-router-dom';
import Table from '../../../components/AddProductTable';
import Title from '../../../components/Title';
import AddProduct from '../../../components/AddProduct';

import Select from '../../../components/Select';
import Button from '../../../components/Button';

import { Container, Content, ButtonDiv, ButtonSave } from './styles';
import { ProductProps, registerOptions } from '../../../utils/props';
import api from '../../../services/api';
import { useToast } from '../../../hooks/ToastContext';

const AddRegister: React.FC = () => {
  const [registerType, setRegisterType] = useState('I');
  const [products, setProducts] = useState<ProductProps[] | undefined>([]);
  const [registerCreated, setRegisterCreated] = useState(false);

  const [readOnly, setReadOnly] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(() => {
    try {
      const productsSend = products?.map((product) => {
        return {
          ...product,
          category: product.category.id,
          provider: product.provider.id,
          mold: product.mold.id,
        };
      });
      api.post('registers', {
        type: registerType,
        products: productsSend,
      });
      addToast({
        type: 'success',
        title: 'Registro criado com sucesso!',
      });
      setTimeout(() => setRegisterCreated(true), 500);
    } catch (err) {
      throw new Error(err);
    }
  }, [products, registerType, addToast]);

  const handleSubmitProduct = useCallback(
    (data: ProductProps): void => {
      if (products) {
        setProducts([...products, data]);
      } else {
        setProducts([data]);
      }
      setAddProduct(false);
    },
    [setAddProduct, products]
  );

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

  const handleProduct = useCallback(
    (product) => {
      if (products)
        setProducts([
          ...products.filter((obj) => obj.id !== product.id),
          product,
        ]);
    },
    [products]
  );

  return (
    <Container>
      {registerCreated && <Redirect to="/dashboard/registers" />}
      <Title>
        <h1>Adicionar registro</h1>
      </Title>
      <Content>
        <h2>
          Tipo:
          <Select
            label=""
            options={registerOptions}
            readOnly={readOnly}
            onChange={handleChange}
          />
        </h2>

        {!addProduct && (
          <ButtonDiv>
            <Button onClick={handleAddProduct}>
              <ImPlus />
              Adicionar produto
            </Button>
          </ButtonDiv>
        )}
      </Content>
      {products && <Table handleProduct={handleProduct} products={products} />}

      {addProduct && <AddProduct handleSubmitProduct={handleSubmitProduct} />}
      {products && products.length > 0 && !addProduct ? (
        <ButtonSave>
          <Button onClick={handleSubmit}>Salvar registro</Button>
        </ButtonSave>
      ) : (
        ''
      )}
    </Container>
  );
};

export default AddRegister;
