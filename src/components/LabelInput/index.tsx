import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';
import Input from '../Input';

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ name, label, ...rest }) => {
  return (
    <Container>
      <p>{label}</p>
      <Input name={name} {...rest} />
    </Container>
  );
};

export default LabelInput;
