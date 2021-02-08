import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import CurrencyInput from 'react-currency-input-field';

import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';

import { useField } from '@unform/core';
import { Container, Content, Error } from './styles';

interface InputFloatProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  defaultValue?: number;
  readOnly?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  label: string;
  onValueChange?: (value: string | undefined) => void;
}
const InputFloat: React.FC<InputFloatProps> = ({
  name,
  readOnly = false,
  icon: Icon,
  label,
  defaultValue,
  onValueChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <p>{label}</p>
      <Content isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
        <CurrencyInput
          name={name}
          decimalsLimit={2}
          decimalSeparator=","
          prefix="R$"
          allowNegativeValue={false}
          defaultValue={defaultValue}
          readOnly={readOnly}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          onValueChange={onValueChange}
        />
        {error && (
          <Error title={error}>
            <FiAlertTriangle color="#c53030" />
          </Error>
        )}
      </Content>
    </Container>
  );
};

export default InputFloat;
