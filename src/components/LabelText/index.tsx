import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';
import Textarea from '../Textarea';

interface LabelInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ name, label, ...rest }) => {
  return (
    <Container>
      <p>{label}</p>
      <Textarea name={name} {...rest} />
    </Container>
  );
};

export default LabelInput;
