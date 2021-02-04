import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FaRegEdit } from 'react-icons/fa';
import * as Yup from 'yup';

import api from '../../../services/api';
import LabelInput from '../../../components/LabelInput';

import { Container, InputForm, ButtonDiv } from './styles';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

import { CategoryProps, MoldProps, ProductProps } from '../../../utils/props';
import { useToast } from '../../../hooks/ToastContext';
import getValidationErrors from '../../../utils/getValidationErrors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
      color: '#000',
    },
    div: {
      maxWidth: '100px',
      width: '100%',
    },
    input: {
      borderColor: '#000',
    },
    load: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& .MuiCircularProgress-root': {
        borderColor: '#000',
      },
    },
  })
);

interface ParamsProps {
  id: string;
}

const genreOptions = [
  { key: 'F', text: 'Feminino' },
  { key: 'M', text: 'Masculino' },
];

interface Options {
  key: string;
  text: string;
}

const sizeOptions: Options[] = [
  { key: 'PP', text: 'PP' },
  { key: 'P', text: 'P' },
  { key: 'M', text: 'M' },
  { key: 'G', text: 'G' },
  { key: 'GG', text: 'GG' },
  { key: '33', text: '33' },
  { key: '34', text: '34' },
  { key: '35', text: '35' },
  { key: '36', text: '36' },
  { key: '37', text: '37' },
  { key: '38', text: '38' },
  { key: '39', text: '39' },
  { key: '40', text: '40' },
  { key: '41', text: '41' },
  { key: '42', text: '42' },
  { key: '43', text: '43' },
  { key: '44', text: '44' },
  { key: '45', text: '45' },
  { key: '46', text: '46' },
  { key: '47', text: '47' },
  { key: '48', text: '48' },
  { key: '49', text: '49' },
  { key: '50', text: '50' },
  { key: '51', text: '51' },
  { key: '52', text: '52' },
];

const ProductView: React.FC = () => {
  const { id } = useParams<ParamsProps>();
  const formRef = useRef<FormHandles>(null);
  const initialMoldState: Options = {
    key: '',
    text: '',
  };
  const { addToast } = useToast();

  const [readOnly, setReadOnly] = useState(true);
  // const { register, handleSubmit } = useForm();
  const [edition, setEdition] = useState(false);
  const [molds, setMolds] = useState<MoldProps[]>({} as MoldProps[]);
  const [moldsOptions] = useState<Options[]>({} as Options[]);
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryProps[] | undefined>(
    undefined
  );

  const handleSubmit = useCallback(async (data: ProductProps) => {
    try {
      formRef.current?.setErrors({});
      setEdition(false);
      setReadOnly(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        category: Yup.string().required('Categoria obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      addToast({
        title: 'Informações alteradas com sucesso.',
        type: 'success',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      setEdition(true);

      addToast({
        title: 'Erro',
        type: 'error',
        description: 'Verifique as informações',
      });
    }
  }, []);
  // const handleMoldOptions = useCallback(() => {
  //   molds.map((mold) => (
  //     moldsOptions.push({ key: mold.name, text: mold.name });
  //   );
  //   console.log('oijefa');
  // }, [molds, moldsOptions]);

  useEffect(() => {
    api.get(`products/${id}`).then((response) => {
      setProduct(response.data);
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

  const handleEdition = (): void => {
    setEdition(true);
    setReadOnly(false);
  };

  // useCallback(() => {
  //   categories?.map((category) =>
  //     categoriesOptions.push({ key: category.name, text: category.name })
  //   );
  //   console.log('oasdjfsaio');
  // }, [categories]);

  if (product && Object.keys(moldsOptions).length === 0) {
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
          <h2>Informações</h2>

          <InputForm>
            <div>
              <LabelInput
                name="name"
                label="Nome"
                defaultValue={product.name}
                readOnly={readOnly}
              />
              <LabelInput
                name="category"
                label="Categoria"
                placeholder="Usuário"
                defaultValue={product.category.name}
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
            </div>
            <div>
              <Select
                options={genreOptions}
                label="Gênero"
                defaultValue={product.size}
                readOnly={readOnly}
              />
              <Select
                options={sizeOptions}
                label="Tamanho"
                readOnly={readOnly}
              />
              <LabelInput
                name="mold"
                label="Modelo"
                defaultValue={product.mold.name}
                readOnly={readOnly}
              />
              <LabelInput
                name="provider"
                label="Fornecedor"
                defaultValue={product.provider.name}
                readOnly={readOnly}
              />
            </div>
          </InputForm>

          {/* <h2>Login</h2>

          <InputForm>
            <div>
              <LabelInput
                name="category"
                label="Categoria"
                placeholder="selecione..."
                defaultValue={product.category.name}
                readOnly={readOnly}
              />
              <LabelInput
                name="mold"
                label="Modelo"
                defaultValue={product.mold.name}
                readOnly={readOnly}
              />
              <LabelInput
                name="color"
                label="Cor"
                defaultValue={product.name}
                readOnly={readOnly}
              />
              <LabelInput
                name="category"
                label="Categoria"
                defaultValue={product.category.name}
                readOnly={readOnly}
              />
            </div>
            <div>
              <LabelInput
                name="mold"
                label="Modelo"
                defaultValue={product.mold.name}
                readOnly={readOnly}
              />
              <LabelInput
                name="category"
                label="Nome"
                defaultValue={product.name}
                readOnly={readOnly}
              />
            </div>
          </InputForm> */}
          {edition && <Button type="submit">Salvar</Button>}
        </Form>
      </Container>
    );
  }

  return <h1>Carregando</h1>;
};

export default ProductView;
