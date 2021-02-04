import React, { useCallback, useEffect, useRef, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FaRegEdit } from 'react-icons/fa';
import * as Yup from 'yup';
import { CgUnavailable } from 'react-icons/cg';
import { BsCheckBox } from 'react-icons/bs';

import api from '../../../services/api';
import LabelInput from '../../../components/LabelInput';

import {
  Container,
  InputForm,
  ButtonDiv,
  Status,
  TooltipI,
  TooltipO,
} from './styles';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

import { CategoryProps, MoldProps, ProductProps } from '../../../utils/props';
import { useToast } from '../../../hooks/ToastContext';
import getValidationErrors from '../../../utils/getValidationErrors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    load: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
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
  { id: 'F', name: 'Feminino' },
  { id: 'M', name: 'Masculino' },
];

interface Options {
  id: string;
  name: string;
}

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

const ProductView: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<ParamsProps>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [readOnly, setReadOnly] = useState(true);

  // const { register, handleSubmit } = useForm();
  const [edition, setEdition] = useState(false);
  const [molds, setMolds] = useState<MoldProps[] | undefined>(undefined);
  const [provider, setProviders] = useState<MoldProps[] | undefined>(undefined);

  // let moldsOptions = {} as Options[];
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryProps[] | undefined>(
    undefined
  );

  const handleSubmit = useCallback(
    async (data: ProductProps) => {
      try {
        formRef.current?.setErrors({});
        setEdition(false);
        setReadOnly(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          color: Yup.string().required('Cor obrigatória'),
          marca: Yup.string().required('Categoria obrigatória'),
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
    },
    [addToast]
  );

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
  useEffect(() => {
    api.get(`providers`).then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleEdition = (): void => {
    setEdition(true);
    setReadOnly(false);
  };

  // useEffect(() => {
  // molds.map((mold) => moldsOptions.push({ key: mold.id, text: mold.name }));
  // molds.map((mold) => {
  //   setMoldsOptions([...moldsOptions, { key: mold.id, text: mold.name }]);
  // });
  // setMoldsOptions([
  //   ...moldsOptions,
  //   ...molds.map((mold) => ({
  //     key: mold.id,
  //     text: mold.name,
  //   })),
  // ]);
  //   for (let i = 0; i < molds.length; i + 1)
  //     setMoldsOptions([
  //       ...moldsOptions,
  //       { key: molds[i].id, text: molds[i].name },
  //     ]);
  // }, [molds, moldsOptions]);

  if (product) {
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

          <Status>
            <h2>Status:</h2>
            {product.status === 'I' ? (
              <TooltipI title="Em estoque">
                <BsCheckBox size={30} />
              </TooltipI>
            ) : (
              <TooltipO title="Indisponível">
                <CgUnavailable size={30} />
              </TooltipO>
            )}
          </Status>
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
                options={genreOptions}
                label="Gênero"
                defaultValue={product.genre}
                readOnly={readOnly}
              />
              <Select
                options={sizeOptions}
                label="Tamanho"
                defaultValue={product.size}
                readOnly={readOnly}
              />
            </div>
            <div>
              <Select
                options={molds}
                label="Modelo"
                defaultValue={product.mold.name}
                readOnly={readOnly}
              />

              <Select
                options={provider}
                label="Fornecedor"
                defaultValue={product.category.name}
                readOnly={readOnly}
              />
              <Select
                options={categories}
                label="Categorias"
                defaultValue={product.category.name}
                readOnly={readOnly}
              />
            </div>
          </InputForm>
          <h1>Valores</h1>
          <InputForm>
            <div>
              <LabelInput
                name="Valor de compra"
                label="Valor de compra"
                defaultValue={product.purchase_value}
                readOnly={readOnly}
              />
            </div>
          </InputForm>

          {edition && <Button type="submit">Salvar</Button>}
        </Form>
      </Container>
    );
  }

  return (
    <Container className={classes.load}>
      <div>
        <CircularProgress />
      </div>
    </Container>
  );
};

export default ProductView;
