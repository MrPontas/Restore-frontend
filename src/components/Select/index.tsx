import React, {
  SelectHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Container, Content } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    key: string;
    text: string;
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
            <option key={option.key}>{option.text}</option>
          ))}
        </select>
      </Content>
    </Container>
  );
};

export default Select;
