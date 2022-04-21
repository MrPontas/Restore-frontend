import React from 'react';

import { Container } from './styles';

const Title: React.FC = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Title;
