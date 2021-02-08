import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import LabelInput from '../LabelInput';
import InputFloat from '../InputFloat';

import { Container, InputForm } from './styles';
import Button from '../Button';
import Select, { Options } from '../Select';

import {
  CategoryProps,
  MoldProps,
  ProviderProps,
  ProductPropsAdd,
} from '../../utils/props';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

const genreOptions = [
  { id: 'F', name: 'Feminino' },
  { id: 'M', name: 'Masculino' },
];

const typeOptions = [
  { id: 'C', name: 'Consignado' },
  { id: 'O', name: 'Próprio' },
];

const sizeOptions: Options[] = [
  { id: 'PP', name: 'PP' },
  { id: 'P', name: 'P' },
  { id: 'M', name: 'M' },
  { id: 'G', name: 'G' },
  { id: 'GG', name: 'GG' },
  { id: '33', name: '33' },
  { id: '34', name: '34' },
  { id: '35', name: '35' },
  { id: '36', name: '36' },
  { id: '37', name: '37' },
  { id: '38', name: '38' },
  { id: '39', name: '39' },
  { id: '40', name: '40' },
  { id: '41', name: '41' },
  { id: '42', name: '42' },
  { id: '43', name: '43' },
  { id: '44', name: '44' },
  { id: '45', name: '45' },
  { id: '46', name: '46' },
  { id: '47', name: '47' },
  { id: '48', name: '48' },
  { id: '49', name: '49' },
  { id: '50', name: '50' },
  { id: '51', name: '51' },
  { id: '52', name: '52' },
];
interface AddProductProps {
  handleSubmitProduct?: (data: ProductPropsAdd) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ handleSubmitProduct }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [categories, setCategories] = useState<CategoryProps[]>(
    {} as CategoryProps[]
  );
  const [molds, setMolds] = useState<MoldProps[]>({} as MoldProps[]);
  const [providers, setProviders] = useState<ProviderProps[]>(
    {} as ProviderProps[]
  );

  const [sizeSelect, setSizeSelect] = useState<string | undefined>(undefined);
  const [genreSelect, setGenreSelect] = useState<string | undefined>(undefined);
  const [typeSelect, setTypeSelect] = useState<string | undefined>(undefined);
  const [moldSelect, setMoldSelect] = useState<string | undefined>(undefined);
  const [categorySelect, setCategorySelect] = useState<string | undefined>(
    undefined
  );
  const [providerSelect, setProviderSelect] = useState<string | undefined>(
    undefined
  );

  // const regExp = '/([0-9]{3}),([0-9]{2}$)/g';

  const handleSubmit = useCallback(
    async (data) => {
      formRef.current?.setErrors({});
      try {
        if (!typeSelect) {
          addToast({
            title: 'Erro no tipo de compra',
            description: 'Por favor insira o tipo de compra',
            type: 'error',
          });
        }
        if (!sizeSelect) {
          addToast({
            title: 'Erro no tamanho',
            description: 'Por favor insira o tamanho',
            type: 'error',
          });
        }
        if (!genreSelect) {
          addToast({
            title: 'Erro no gênero',
            description: 'Por favor insira o gênero',
            type: 'error',
          });
        }
        if (!providerSelect) {
          addToast({
            title: 'Erro no fornecedor',
            description: 'Por favor insira o fornecedor',
            type: 'error',
          });
        }
        if (!categorySelect) {
          addToast({
            title: 'Erro na categoria',
            description: 'Por favor insira a categoria',
            type: 'error',
          });
        }
        if (!moldSelect) {
          addToast({
            title: 'Erro no modelo',
            description: 'Por favor insira o modelo',
            type: 'error',
          });
        }
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          color: Yup.string().required('Cor obrigatória'),
          brand: Yup.string().required('Marca obrigatória'),
          purchase_value: Yup.string().required('Valor de compra obrigatório'),
          sale_value: Yup.string().required('Valor de venda obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        if (
          !typeSelect ||
          !genreSelect ||
          !sizeSelect ||
          !categorySelect ||
          !moldSelect ||
          !providerSelect
        )
          return;

        const purchaseValueString: string = data.purchase_value
          .replace('R$', '')
          .replace(',', '.');
        const purchaseValue = parseFloat(purchaseValueString);

        const saleValueString: string = data.sale_value
          .replace('R$', '')
          .replace(',', '.');
        const saleValue = parseFloat(saleValueString);
        if (saleValue < purchaseValue) {
          addToast({
            title: 'Erro de valor',
            description:
              'O valor de compra não pode ser maior que o valor de venda',
            type: 'error',
          });
          return;
        }
        const product: ProductPropsAdd = {
          name: data.name,
          color: data.color,
          brand: data.brand,
          purchase_value: purchaseValue,
          sale_value: saleValue,
          genre: genreSelect,
          size: sizeSelect,
          purchase_type: typeSelect,
          category: categorySelect,
          mold: moldSelect,
          provider: providerSelect,
        } as ProductPropsAdd;
        if (handleSubmitProduct) handleSubmitProduct(product);
      } catch (err) {
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
      addToast,
      categorySelect,
      moldSelect,
      providerSelect,
      genreSelect,
      sizeSelect,
      typeSelect,
      handleSubmitProduct,
    ]
  );

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

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Informações</h1>

        <InputForm>
          <div>
            <LabelInput name="name" label="Nome" />

            <LabelInput name="color" label="Cor" />

            <LabelInput name="brand" label="Marca" />
            <Select
              name="genre"
              id="genre"
              options={genreOptions}
              onChange={handleGenre}
              label="Gênero"
              hasDefaultValue
            />
            <Select
              name="size"
              id="size"
              options={sizeOptions}
              onChange={handleSize}
              label="Tamanho"
              hasDefaultValue
            />
          </div>
          <div>
            <Select
              name="type"
              id="type"
              options={typeOptions}
              onChange={handleType}
              label="Tipo de compra"
              hasDefaultValue
            />
            <Select
              name="mold"
              id="mold"
              options={molds}
              onChange={handleMold}
              label="Modelo"
              hasDefaultValue
            />

            <Select
              name="provider"
              id="provider"
              options={providers}
              onChange={handleProvider}
              label="Fornecedor"
              hasDefaultValue
            />
            <Select
              name="category"
              id="category"
              options={categories}
              onChange={handleCategory}
              label="Categoria"
              hasDefaultValue
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
            />

            <InputFloat
              label="Valor de venda"
              name="sale_value"
              id="sale_value"
            />
          </div>
        </InputForm>

        <Button type="submit">Adicionar</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
