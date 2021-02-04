import React from 'react';

import { FiLogOut } from 'react-icons/fi';

import { Switch } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { Background, Container, Header } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import Route from '../../routes/Route';
import Products from './Products';
import ProductView from './ProductView';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const userString = localStorage.getItem('@ReStore:user');

  if (!userString) {
    throw new Error(`Can't find authenticated user.`);
  }
  const user = JSON.parse(userString);
  const name = user.name.split(' ');
  return (
    <Container>
      <Header>
        <div>
          <p>Olá, {name[0]}</p>
          <button type="button" onClick={signOut}>
            <FiLogOut />
            Sair
          </button>
        </div>
      </Header>
      <SideBar />
      <Switch>
        <Route
          path="/dashboard/products"
          exact
          component={Products}
          isPrivate
        />
        <Route
          path="/dashboard/productView/:id"
          component={ProductView}
          isPrivate
        />
      </Switch>

      <Background />
    </Container>
  );
};

export default Dashboard;
