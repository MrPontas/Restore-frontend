import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Switch } from 'react-router-dom';

import SideBar from '../../components/SideBar';

import Users from './Users';
import { UserProps } from '../../utils/props';

import { Background, Container, Header } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import Route from '../../routes/Route';

import Products from './Products';
import ProductView from './ProductView';

import Registers from './Registers';
import RegisterView from './RegisterView';
import AddRegister from './Add Register';

import Categories from './Categories';

const Dashboard: React.FC = () => {
  const { signOut, ensureAuthenticated } = useAuth();
  const user = localStorage.getItem('@ReStore:user');

  if (!user) {
    throw new Error(`Can't find authenticated user.`);
  }
  ensureAuthenticated();
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
        <Route path="/dashboard/users" component={Users} isPrivate isStrict />
        <Route path="/dashboard/categories" component={Categories} isPrivate />
      </Switch>

      <Background />
    </Container>
  );
};

export default Dashboard;
