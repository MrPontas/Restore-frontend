import { CircularProgress } from '@material-ui/core';
import React, {
  SelectHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Container, Content } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: {
    id: string;
    name: string;
  }[];
  label: string;
  readOnly?: boolean;
}
const Select: React.FC<SelectProps> = ({
  options,
  label,
  readOnly = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  if (options && Object.keys(options).length !== 0) {
    return (
      <Container>
        <p>{label}</p>
        <Content isFocused={isFocused} readOnly={readOnly}>
          <select
            onFocus={handleInputFocus}
            ref={inputRef}
            onBlur={handleInputBlur}
          >
            {options.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </select>
        </Content>
      </Container>
    );
  }
  return (
    <Container>
      <div>
        <p>{label}</p>
        <CircularProgress size={15} />
      </div>
      <Content isFocused={isFocused} readOnly={readOnly}>
        <select
          onFocus={handleInputFocus}
          ref={inputRef}
          onBlur={handleInputBlur}
        >
          <option>Carregando...</option>
        </select>
      </Content>
    </Container>
  );
};

export default Select;
