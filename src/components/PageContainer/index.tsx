import React from 'react';

import { Container } from './styles';

interface ContainerProps {
  whiteBackground?: boolean;
}

const PageContainer: React.FC<ContainerProps> = ({
  children,
  whiteBackground,
}) => {
  return <Container whiteBackground={whiteBackground}>{children}</Container>;
};

export default PageContainer;
