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
  ProductProps,
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
  handleEditedProduct?: (data: ProductProps) => void;
  editProduct?: ProductProps;
}

const EditProduct: React.FC<AddProductProps> = ({
  handleEditedProduct,
  editProduct,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [categories, setCategories] = useState<CategoryProps[]>(
    {} as CategoryProps[]
  );
  const [molds, setMolds] = useState<MoldProps[]>({} as MoldProps[]);
  const [providers, setProviders] = useState<ProviderProps[]>(
    {} as ProviderProps[]
  );

  const [sizeSelect, setSizeSelect] = useState<string | undefined>(
    editProduct?.size
  );
  const [genreSelect, setGenreSelect] = useState<string | undefined>(
    editProduct?.genre
  );
  const [typeSelect, setTypeSelect] = useState<string | undefined>(
    editProduct?.purchase_type
  );
  const [moldSelect, setMoldSelect] = useState<MoldProps | undefined>(
    editProduct?.mold
  );
  const [categorySelect, setCategorySelect] = useState<
    CategoryProps | undefined
  >(editProduct?.category);
  const [providerSelect, setProviderSelect] = useState<
    ProviderProps | undefined
  >(editProduct?.provider);

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
        const product: ProductProps = {
          id: editProduct?.id,
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
        } as ProductProps;
        if (handleEditedProduct) handleEditedProduct(product);
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
      handleEditedProduct,
      editProduct?.id,
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
    const moldName = e.target.value;
    if (eventMold) {
      setMoldSelect({ id: eventMold, name: moldName });
    }
  }, []);
  const handleCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventCategory = e.target.options[selectedIndex].getAttribute('id');
    const categoryName = e.target.value;
    if (eventCategory) {
      setCategorySelect({ id: eventCategory, name: categoryName });
    }
  }, []);
  const handleProvider = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target.options;
    const eventProvider = e.target.options[selectedIndex].getAttribute('id');
    const providerName = e.target.value;
    if (eventProvider) {
      setProviderSelect({ id: eventProvider, name: providerName });
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
            <LabelInput
              name="name"
              label="Nome"
              defaultValue={editProduct?.name}
            />

            <LabelInput
              name="color"
              label="Cor"
              defaultValue={editProduct?.color}
            />

            <LabelInput
              name="brand"
              label="Marca"
              defaultValue={editProduct?.brand}
            />
            <Select
              name="genre"
              id="genre"
              options={genreOptions}
              onChange={handleGenre}
              label="Gênero"
              defaultValue={editProduct?.genre}
            />
            <Select
              name="size"
              id="size"
              options={sizeOptions}
              onChange={handleSize}
              label="Tamanho"
              defaultValue={editProduct?.size}
            />
          </div>
          <div>
            <Select
              name="type"
              id="type"
              options={typeOptions}
              onChange={handleType}
              label="Tipo de compra"
              defaultValue={editProduct?.purchase_type}
            />
            <Select
              name="mold"
              id="mold"
              options={molds}
              onChange={handleMold}
              label="Modelo"
              defaultValue={editProduct?.mold.name}
            />

            <Select
              name="provider"
              id="provider"
              options={providers}
              onChange={handleProvider}
              label="Fornecedor"
              defaultValue={editProduct?.provider.name}
            />
            <Select
              name="category"
              id="category"
              options={categories}
              onChange={handleCategory}
              label="Categoria"
              defaultValue={editProduct?.category.name}
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
              defaultValue={editProduct?.purchase_value}
            />

            <InputFloat
              label="Valor de venda"
              name="sale_value"
              id="sale_value"
              defaultValue={editProduct?.sale_value}
            />
          </div>
        </InputForm>

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
