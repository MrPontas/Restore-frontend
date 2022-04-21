import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  positionX?: string;
  positionY?: string;
}
const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  positionX = '',
  positionY = '',
  children,
}) => {
  return (
    <Container
      className={className}
      positionX={positionX}
      positionY={positionY}
    >
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
