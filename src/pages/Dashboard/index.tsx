import React, { useEffect } from 'react';

import { FiLogOut } from 'react-icons/fi';

import { Switch } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { Background, Container, Header } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import Route from '../../routes/Route';
import Products from './Products';
import ProductView from './ProductView';
import { UserProps } from '../../utils/props';
import Registers from './Registers';
import RegisterView from './RegisterView';
import AddRegister from './Add Register';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    api.get('sessions').then((response) => {
      if (response.status === 401) {
        signOut();
      }
    });
  }, [signOut]);
  const user = localStorage.getItem('@ReStore:user');

  if (!user) {
    throw new Error(`Can't find authenticated user.`);
  }
  const userObject: UserProps = JSON.parse(user);

  const name = userObject.name.split(' ');
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
          path="/dashboard/registers"
          exact
          component={Registers}
          isPrivate
        />
        <Route
          path="/dashboard/productView/:id"
          component={ProductView}
          isPrivate
        />
        <Route
          path="/dashboard/registerView/:id"
          component={RegisterView}
          isPrivate
        />
        <Route
          path="/dashboard/addRegister"
          component={AddRegister}
          isPrivate
        />
      </Switch>

      <Background />
    </Container>
  );
};

export default Dashboard;
