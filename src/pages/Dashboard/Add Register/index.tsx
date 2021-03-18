import React, { useCallback, useState } from 'react';
import { ImPlus } from 'react-icons/im';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

import { Redirect } from 'react-router-dom';
import Table from '../../../components/AddProductTable';
import Title from '../../../components/Title';
import AddInputProduct from '../../../components/AddInputProduct';
import AddOutputProduct from '../../../components/AddOutputProduct';

import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';

import {
  Container,
  Content,
  ButtonDiv,
  ButtonSave,
  ButtonOutDiv,
} from './styles';
import { ProductProps, registerOptions } from '../../../utils/props';
import api from '../../../services/api';
import { useToast } from '../../../hooks/ToastContext';

const AddRegister: React.FC = () => {
  const [registerType, setRegisterType] = useState('I');
  const [products, setProducts] = useState<ProductProps[] | undefined>(
    undefined
  );
  const [registerCreated, setRegisterCreated] = useState(false);

  const [readOnly, setReadOnly] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [toRegister, setToRegister] = useState(false);
  const [alertView, setAlertView] = useState(false);

  const { addToast } = useToast();

  const handleOpenAlert = useCallback(() => {
    setAlertView(true);
  }, []);

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
      setTimeout(() => setRegisterCreated(true), 1500);
    } catch (err) {
      throw new Error(err);
    }
  }, [products, registerType, addToast]);

  const handleSubmitInputProduct = useCallback(
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

  const handleSubmitOutputProduct = useCallback(
    (data: ProductProps[]): void => {
      setProducts(data);
    },
    []
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
    if (registerType === 'I' || registerType === 'O') {
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

  const handleCancelRegister = useCallback(() => {
    setToRegister(true);
  }, []);
  if (toRegister) return <Redirect to="registers" />;
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
      {alertView && (
        <Alert
          title="Tem certeza?"
          description="Os dados não serão salvos!"
          openAlert
          open
          handleConfirm={handleCancelRegister}
          button={false}
        />
      )}

      {products && <Table handleProduct={handleProduct} products={products} />}

      {addProduct && registerType === 'I' && (
        <AddInputProduct handleSubmitProduct={handleSubmitInputProduct} />
      )}
      {addProduct && registerType === 'O' && (
        <AddOutputProduct handleSubmitProduct={handleSubmitOutputProduct} />
      )}
      {products && registerType === 'O' && (
        <ButtonOutDiv>
          <Button id="cancel" onClick={handleOpenAlert}>
            <MdCancel size={20} /> Cancelar
          </Button>

          <Button onClick={handleSubmit}>
            <AiFillCheckCircle size={20} /> Salvar registro
          </Button>
        </ButtonOutDiv>
      )}

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
