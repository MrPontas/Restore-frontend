import React, { ButtonHTMLAttributes, useState } from 'react';

import { VscSymbolKeyword } from 'react-icons/vsc';
import { RiShirtLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { MdChromeReaderMode } from 'react-icons/md';
import { GiFactory } from 'react-icons/gi';
import { IoIosPaper } from 'react-icons/io';
import { BiGridAlt } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import { Container, Button } from './styles';

interface SideBarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const SideBar: React.FC = () => {
  const [isActiveProduct, setIsActiveProduct] = useState(false);
  return (
    <Container>
      <header>
        <div />
      </header>
      <NavLink to="/dashboard/registers" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <VscSymbolKeyword size={30} />
          Registros
        </Button>
      </NavLink>

      <NavLink to="/dashboard/products" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <RiShirtLine size={30} />
          Produtos
        </Button>
      </NavLink>
      <NavLink to="/dashboard/categories" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <MdChromeReaderMode size={30} />
          Categorias
        </Button>
      </NavLink>
      <NavLink to="/dashboard/providers" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <GiFactory size={30} />
          Fornecedores
        </Button>
      </NavLink>
      <NavLink to="/dashboard/molds" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <BiGridAlt size={30} />
          Modelos
        </Button>
      </NavLink>
      <NavLink to="/dashboard/report" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <IoIosPaper size={30} />
          Relatórios
        </Button>
      </NavLink>
      <NavLink to="/dashboard/users" style={{ textDecoration: 'none' }}>
        <Button type="button">
          <FiUsers size={30} />
          Usuários
        </Button>
      </NavLink>
      <div />
    </Container>
  );
};

export default SideBar;
