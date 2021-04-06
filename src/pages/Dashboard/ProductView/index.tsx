import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FaRegEdit } from 'react-icons/fa';
import * as Yup from 'yup';
import { CgUnavailable } from 'react-icons/cg';
import { BsCheckBox } from 'react-icons/bs';

import api from '../../../services/api';
import LabelInput from '../../../components/LabelInput';
import InputFloat from '../../../components/InputFloat';
import Textarea from '../../../components/Textarea';

import { Container, InputForm, ButtonDiv, Status, StatusDiv } from './styles';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

import {
  CategoryProps,
  MoldProps,
  ProductProps,
  ProviderProps,
  genreOptions,
  sizeOptions,
  typeOptions,
} from '../../../utils/props';
import { useToast } from '../../../hooks/ToastContext';
import getValidationErrors from '../../../utils/getValidationErrors';
import Loading from '../../../components/Loading';

interface ParamsProps {
  id: string;
}

const ProductView: React.FC = () => {
  const { id } = useParams<ParamsProps>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [readOnly, setReadOnly] = useState(true);

  const [edition, setEdition] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[] | undefined>(
    undefined
  );
  const [molds, setMolds] = useState<MoldProps[] | undefined>(undefined);
  const [providers, setProviders] = useState<ProviderProps[] | undefined>(
    undefined
  );
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [sizeSelect, setSizeSelect] = useState('');
  const [genreSelect, setGenreSelect] = useState('');
  const [typeSelect, setTypeSelect] = useState('');
  const [moldSelect, setMoldSelect] = useState('');
  const [categorySelect, setCategorySelect] = useState('');
  const [providerSelect, setProviderSelect] = useState('');
  const [productInStock, setProductInStock] = useState(false);
  const [obs, setObs] = useState('');

  const handleEdition = (): void => {
    if (edition) return;
    setEdition(true);
    setReadOnly(false);
    addToast({
      title: 'Modo edição',
      description: 'Agora você pode editar as informações',
      type: 'info',
    });
  };
  const handleCatchEdition = useCallback(() => {
    setEdition(true);
    setReadOnly(false);
  }, []);

  const handleDefaultValue = useCallback((value: number): string => {
    if (value % 1 !== 0) {
      return String(value);
    }
    const stringValue = `${String(value)},00`;
    return stringValue;
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          color: Yup.string().required('Cor obrigatória'),
          purchase_value: Yup.string().required('Valor de compra obrigatório'),
          sale_value: Yup.string().required('Valor de venda obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const purchaseValueString: string = data.purchase_value
          .replace('R$', '')
          .replace(',', '.');
        const purchaseValue = parseFloat(purchaseValueString);

        const saleValueString: string = data.sale_value
          .replace('R$', '')
          .replace(',', '.');
        const saleValue = parseFloat(saleValueString);

        await api.put(`products/${product?.id}`, {
          name: data.name,
          color: data.color,
          brand: data.brand,
          obs: data.obs,
          purchase_value: purchaseValue,
          sale_value: saleValue,
          genre: genreSelect,
          size: sizeSelect,
          purchase_type: typeSelect,
          category: categorySelect,
          mold: moldSelect,
          provider: providerSelect,
        });
        addToast({
          title: 'Informações alteradas com sucesso.',
          type: 'success',
        });
        setEdition(false);
        setReadOnly(true);
      } catch (err) {
        handleCatchEdition();

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro',
          type: 'error',
          description: 'Verifique as informações',
        });
        throw new Error(err);
      }
    },
    [
      moldSelect,
      product,
      categorySelect,
      providerSelect,
      genreSelect,
      sizeSelect,
      typeSelect,
      addToast,
      handleCatchEdition,
    ]
  );

  useEffect(() => {
    api.get(`products/${id}`).then((response) => {
      setProduct(response.data);
      if (response.data.status === 'I') setProductInStock(true);
      else setProductInStock(false);
    });
  }, [id]);
  useEffect(() => {
    api.get(`categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  useEffect(() => {
    api.get(`models`).then((response) => {
      setMolds(response.data);
    });
  }, []);
  useEffect(() => {
    api.get(`providers`).then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleType = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventType = e.target.options[selectedIndex].getAttribute('id');
    if (eventType) {
      setTypeSelect(eventType);
    }
  }, []);
  const handleMold = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventMold = e.target.options[selectedIndex].getAttribute('id');
    if (eventMold) {
      setMoldSelect(eventMold);
    }
  }, []);
  const handleCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventCategory = e.target.options[selectedIndex].getAttribute('id');
    if (eventCategory) {
      setCategorySelect(eventCategory);
    }
  }, []);
  const handleProvider = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventProvider = e.target.options[selectedIndex].getAttribute('id');
    if (eventProvider) {
      setProviderSelect(eventProvider);
    }
  }, []);
  const handleGenre = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventGenre = e.target.options[selectedIndex].getAttribute('id');
    if (eventGenre) {
      setGenreSelect(eventGenre);
    }
  }, []);
  const handleSize = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventSize = e.target.options[selectedIndex].getAttribute('id');
    if (eventSize) {
      setSizeSelect(eventSize);
    }
  }, []);

  if (product && categories && molds && providers) {
    return (
      <Container>
        <Title>
          <h1>{product.name}</h1>
        </Title>
        <ButtonDiv>
          <Button type="button" onClick={handleEdition}>
            <FaRegEdit />
            Editar
          </Button>
        </ButtonDiv>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Informações</h1>

          <StatusDiv>
            <h2>Status:</h2>
            <Status inStock={productInStock}>
              {productInStock ? (
                <BsCheckBox size={30} />
              ) : (
                <CgUnavailable size={30} />
              )}
              {productInStock ? <h3>Em estoque</h3> : <h3>Indisponível</h3>}
            </Status>
          </StatusDiv>
          <InputForm>
            <div>
              <LabelInput
                name="name"
                label="Nome"
                defaultValue={product.name}
                readOnly={readOnly}
              />

              <LabelInput
                name="color"
                label="Cor"
                defaultValue={product.color}
                readOnly={readOnly}
              />

              <LabelInput
                name="brand"
                label="Marca"
                defaultValue={product.brand}
                readOnly={readOnly}
              />
              <Select
                name="genre"
                id="genre"
                options={genreOptions}
                onChange={handleGenre}
                label="Gênero"
                defaultValue={product.genre}
                readOnly={readOnly}
              />
              <Select
                name="size"
                id="size"
                options={sizeOptions}
                onChange={handleSize}
                label="Tamanho"
                defaultValue={product.size}
                readOnly={readOnly}
              />
            </div>
            <div>
              <Select
                name="type"
                id="type"
                options={typeOptions}
                onChange={handleType}
                label="Tipo de compra"
                defaultValue={
                  product.purchase_type === 'O' ? 'Próprio' : 'Consignado'
                }
                readOnly={readOnly}
              />
              <Select
                name="mold"
                id="mold"
                options={molds}
                onChange={handleMold}
                label="Modelo"
                defaultValue={product.mold.name}
                readOnly={readOnly}
              />

              <Select
                name="provider"
                id="provider"
                options={providers}
                onChange={handleProvider}
                label="Fornecedor"
                defaultValue={product.provider.name}
                readOnly={readOnly}
              />

              <Select
                name="category"
                id="category"
                options={categories}
                onChange={handleCategory}
                label="Categoria"
                defaultValue={product.category.name}
                readOnly={readOnly}
              />
            </div>
          </InputForm>
          <h1>Valores</h1>
          <InputForm>
            <div>
              <InputFloat
                name="purchase_value"
                id="purchase_value"
                label="Valor de compra"
                defaultValue={handleDefaultValue(product.purchase_value)}
                readOnly={readOnly}
              />
              <InputFloat
                label="Valor de venda"
                name="sale_value"
                id="sale_value"
                defaultValue={handleDefaultValue(product.sale_value)}
                readOnly={readOnly}
              />
            </div>
          </InputForm>
          <h1>Observações</h1>

          <Textarea
            name="obs"
            id="obsContainer"
            readOnly={readOnly}
            defaultValue={product.obs}
          />

          {edition && <Button type="submit">Salvar</Button>}
        </Form>
      </Container>
    );
  }

  return <Loading />;
};

export default ProductView;
