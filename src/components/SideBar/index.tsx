import React from 'react';

import { VscSymbolKeyword } from 'react-icons/vsc';
import { RiShirtLine } from 'react-icons/ri';
import { FiUsers, FiLayout, FiBriefcase } from 'react-icons/fi';
import { MdChromeReaderMode } from 'react-icons/md';
// import { IoIosPaper } from 'react-icons/io';

import { Container, StyledNavLink } from './styles';
import logoHeader from '../../assets/logo.png';

import { useAuth } from '../../hooks/AuthContext';

const activeStyle: React.CSSProperties = {
  backgroundColor: '#82af99',
  color: 'white',
};
const style: React.CSSProperties = {
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'lighter',
  textDecoration: 'none',
  maxHeight: '50px',
  height: '100%',
  marginTop: '5px',
  padding: '-10px 0 0 0',
  borderRadius: '5px',
  alignItems: 'center',
};

const SideBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <header>
        <div>
          <img src={logoHeader} alt="" />
        </div>
      </header>
      <StyledNavLink
        to="/dashboard/registers"
        activeStyle={activeStyle}
        style={style}
      >
        <VscSymbolKeyword size={30} />
        Registros
      </StyledNavLink>

      <StyledNavLink
        to="/dashboard/products"
        activeStyle={activeStyle}
        style={style}
      >
        <RiShirtLine size={30} />
        Produtos
      </StyledNavLink>
      <StyledNavLink
        to="/dashboard/categories"
        activeStyle={activeStyle}
        style={style}
      >
        <MdChromeReaderMode size={30} />
        Categorias
      </StyledNavLink>
      <StyledNavLink
        to="/dashboard/providers"
        activeStyle={activeStyle}
        style={style}
      >
        <FiBriefcase size={30} />
        Fornecedores
      </StyledNavLink>

      {user.administrator && (
        <StyledNavLink
          to="/dashboard/users"
          activeStyle={activeStyle}
          style={style}
        >
          <FiUsers size={30} />
          Usuários
        </StyledNavLink>
      )}
      <div />
    </Container>
  );
};

export default SideBar;
