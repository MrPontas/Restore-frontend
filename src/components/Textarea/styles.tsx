import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 5px;

  padding: 16px;
  max-width: 550px;
  max-height: 200px;
  width: 100%;
  /* height: 100%; */

  margin-left: 15px;
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


  textarea {
    color: #232129;
    background: transparent;
    resize: none;
    text-align: justify;
    flex: 1;
    height: calc(200px - 32px);
    border: 0;
  }

  svg {
    margin-right: 16px;
    color: #232129;

    ${(props) =>
      props.isFocused &&
      css`
        color: #82af99;
      `}
    ${(props) =>
      props.isFilled &&
      css`
        color: #82af99;
      `}
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;
  svg {
    margin: 0;
  }
`;
