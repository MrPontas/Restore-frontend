import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';

import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
const Input: React.FC<TextareaProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

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
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <textarea
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertTriangle color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
