import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  flex-direction: column;
  align-items: left;
  max-width: 20px;
  p {
    display: block;
    margin: 0 0 5px 18px;
    flex-direction: center;
  }
  Input {
    display: block;
  }
`;

export const Content = styled.div<ContainerProps>`
  border-radius: 5px;

  padding: 16px;
  width: 100%;

  border: 2px solid #444444;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #82af99;
    `}


  input {
    color: #232129;
    background: transparent;
    flex: 1;
    border: 0;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;
  svg {
    margin: 0;
  }
`;
