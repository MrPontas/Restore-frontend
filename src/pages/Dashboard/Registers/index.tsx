import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { searchRegisterOptions, RegisterProps } from '../../../utils/props';

import Table from '../../../components/RegisterTable';
import Title from '../../../components/Title';

import {
  Container,
  ContentHeader,
  StyledButton,
  FormButton,
  StyledInputLabel,
  StyledSelect,
} from './styles';
import api from '../../../services/api';

interface DateProps {
  start: string;
  end: string;
}

const Registers: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [finishedData, setFinishedData] = useState(false);
  const [registers, setRegisters] =
    useState<RegisterProps[] | undefined>(undefined);
  const [registerType, setRegisterType] = useState('A');

  useEffect(() => {
    api.get('registers').then((response) => {
      setRegisters(response.data);
      setFinishedData(true);
    });
  }, [setFinishedData]);

  const handleSearch = useCallback(
    (date: DateProps) => {
      api
        .get(
          `/registers/?start=${date.start}&end=${date.end}&type=${registerType}`
        )
        .then((response) => {
          setRegisters(response.data);
        });
    },
    [registerType]
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

  return (
    <Container>
      <Title>
        <h1>Registros</h1>
      </Title>
      <ContentHeader>
        <Form ref={formRef} onSubmit={handleSearch}>
          <StyledInputLabel label="De" name="start" type="date" />
          <StyledInputLabel label="Até" name="end" type="date" />
          <StyledSelect
            id="selectType"
            label="Tipo:"
            options={searchRegisterOptions}
            onChange={handleChange}
          />
          <FormButton type="submit">
            <BiSearch size={30} />
          </FormButton>
        </Form>
        <NavLink to="/dashboard/addRegister" style={{ textDecoration: 'none' }}>
          <StyledButton>
            <HiOutlineViewGridAdd />
            Adicionar registro
          </StyledButton>
        </NavLink>
      </ContentHeader>
      <Table finishedData={finishedData} registers={registers} />
    </Container>
  );
};

export default Registers;
