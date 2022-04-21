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

import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import LabelInput from '../LabelInput';
import InputFloat from '../InputFloat';

import { Container, InputForm } from './styles';
import Button from '../Button';
import Select from '../Select';
import Textarea from '../Textarea';

import {
  CategoryProps,
  MoldProps,
  ProviderProps,
  ProductProps,
  sizeOptions,
  typeOptions,
  genreOptions,
} from '../../utils/props';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

interface AddInputProductProps {
  handleSubmitProduct?: (data: ProductProps) => void;
}

const AddProduct: React.FC<AddInputProductProps> = ({
  handleSubmitProduct,
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

  const [sizeSelect, setSizeSelect] = useState<string | undefined>(undefined);
  const [genreSelect, setGenreSelect] = useState<string | undefined>(undefined);
  const [typeSelect, setTypeSelect] = useState<string | undefined>(undefined);
  const [moldSelect, setMoldSelect] =
    useState<MoldProps | undefined>(undefined);
  const [categorySelect, setCategorySelect] =
    useState<CategoryProps | undefined>(undefined);
  const [providerSelect, setProviderSelect] =
    useState<ProviderProps | undefined>(undefined);
  const [redirect, setRedirect] = useState(false);
  const [obs, setObs] = useState('');
  const [measure, setMeasure] = useState('');

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
        const product: ProductProps = {
          id: Math.random().toString(),
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
          obs,
          measure,
        } as ProductProps;
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
      obs,
      measure,
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

  const handleObsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setObs(e.target.value);
    },
    [setObs]
  );
  const handleMeasureChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMeasure(e.target.value);
    },
    [setMeasure]
  );
  const handleRedirect = useCallback(() => {
    setRedirect(true);
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
    const eventCategoryId = e.target.options[selectedIndex].getAttribute('id');
    const eventCategoryName = e.target.value;
    if (eventCategoryId) {
      setCategorySelect({
        id: eventCategoryId,
        name: eventCategoryName,
        category_number: 0,
      });
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

  if (redirect) return <Redirect to="registers" />;
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Informações</h1>

        <InputForm>
          <LabelInput name="name" label="Nome" />

          <LabelInput name="color" label="Cor" />

          <LabelInput name="brand" label="Marca" />
          <Select
            name="mold"
            id="mold"
            options={molds}
            onChange={handleMold}
            label="Modelo"
            hasDefaultValue
          />
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
          <Select
            name="category"
            id="category"
            options={categories}
            onChange={handleCategory}
            label="Categoria"
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
        </InputForm>
        <h1>Valores</h1>
        <InputForm>
          <Select
            name="type"
            id="type"
            options={typeOptions}
            onChange={handleType}
            label="Tipo de compra"
            hasDefaultValue
          />
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
        </InputForm>
        <h1>Observações</h1>
        <Textarea name="obs" onChange={handleObsChange} value={obs} />
        <h1>Medidas</h1>
        <Textarea
          name="measure"
          onChange={handleMeasureChange}
          value={measure}
        />
        <Button id="cancelButton" type="button" onClick={handleRedirect}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
