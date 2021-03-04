import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Container, ButtonDiv, InfoDiv } from './styles';
import api from '../../../services/api';

import Title from '../../../components/Title';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';

import Table from '../../../components/RegisterProductsTable';

import { RegisterProps } from '../../../utils/props';
import getDateBr from '../../../utils/getDateBr';

interface ParamsProps {
  id: string;
}

const RegisterView: React.FC = () => {
  const { id } = useParams<ParamsProps>();

  const [register, setRegister] = useState<RegisterProps | undefined>(
    undefined
  );

  useEffect(() => {
    api.get(`registers/${id}`).then((response) => {
      setRegister(response.data);
    });
  }, [id]);

  if (register) {
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
            registerId={register.id}
          />
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
        <Table products={register.products} />
      </Container>
    );
  }
  return <Loading />;
};

export default RegisterView;
