import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isStrict?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isStrict = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (!!user && isStrict && !user.administrator) {
          return (
            <Redirect
              to={{ pathname: isPrivate ? '/' : '/dashboard', state: location }}
            />
          );
        }
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: isPrivate ? '/' : '/dashboard', state: location }}
          />
        );
      }}
    />
  );
};

export default Route;
